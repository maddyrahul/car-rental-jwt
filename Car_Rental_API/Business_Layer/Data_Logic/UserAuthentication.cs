﻿using Data_Access_Layer.DTO;
using Data_Access_Layer.Models;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Business_Layer.Data_Logic
{
    public class UserAuthentication : IUserAuthentication
    {
        private readonly IConfiguration _configuration;
        private readonly IUserLogic _repository;
        public UserAuthentication(IConfiguration configuration, IUserLogic repository)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }


        public async Task<string> RegisterAsync(UserDTO userRegisterDto)
        {
            // Check if a user with the same email already exists
            if (await _repository.GetUserByEmailAsync(userRegisterDto.Email) != null)
            {
                return null; // User with the same email already exists
            }

            string hashedPassword = HashPassword(userRegisterDto.Password);

            // Create a new user entity with the provided information
            User newUser = new User
            {
                Email = userRegisterDto.Email,
                Password = hashedPassword,
                PhoneNumber = userRegisterDto.PhoneNumber,
                Name = userRegisterDto.Name,
                Address = userRegisterDto.Address,
                Role = userRegisterDto.Role
            };

            // Save the new user to the database
            await _repository.AddUserAsync(newUser);

            // Generate a JWT token for the newly registered user
            return GenerateJwtToken(newUser);
        }

        public async Task<string> AuthenticateAsync(NewLoginDto userLoginDto)
        {
            // Validate user credentials (e.g., check username and password against the database)
            User user = await _repository.GetUserByEmailAsync(userLoginDto.Email);

            if (user == null || !VerifyPassword(userLoginDto.Password, user.Password))
            {
                return null; // Invalid email or password
            }

            return GenerateJwtToken(user);
        }

        private string GenerateJwtToken(User user)
        {
            var secret = _configuration["JWT:Secret"];
            var issuer = _configuration["JWT:ValidIssuer"];
            var audience = _configuration["JWT:ValidAudience"];

            // Log or debug these values to ensure they are not null
            if (string.IsNullOrEmpty(secret) || string.IsNullOrEmpty(issuer) || string.IsNullOrEmpty(audience))
            {
                throw new Exception("JWT configuration values are not set properly.");
            }

            var claims = new[]
            {
        new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Role)
    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer,
                audience,
                claims,
                expires: DateTime.Now.AddHours(1), // Adjust expiration time as needed
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        private bool VerifyPassword(string enteredPassword, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(enteredPassword, hashedPassword);
        }

    }
}
