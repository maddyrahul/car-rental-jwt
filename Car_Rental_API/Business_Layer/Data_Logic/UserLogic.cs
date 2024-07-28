using Data_Access_Layer.DTO;
using Data_Access_Layer.Models;
using Microsoft.EntityFrameworkCore;


namespace Business_Layer.Data_Logic
{
    public class UserLogic : IUserLogic
    {
        private readonly CarDBContext _dbContext;

        public UserLogic(CarDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _dbContext.User.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> AuthenticateAsync(UserDTO userDto)
        {
            var user = await _dbContext.User.FirstOrDefaultAsync(u => u.Email == userDto.Email && u.Password == userDto.Password);

            return user; 
        }


        public User GetUserDetailsById(int userId)
        {
            return _dbContext.User.FirstOrDefault(car => car.UserId == userId);
        }


        public async Task AddUserAsync(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            await _dbContext.User.AddAsync(user);
            await _dbContext.SaveChangesAsync();
        }
    }

}
