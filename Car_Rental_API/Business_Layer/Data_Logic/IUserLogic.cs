using Data_Access_Layer.DTO;
using Data_Access_Layer.Models;

namespace Business_Layer.Data_Logic
{
    public interface IUserLogic
    {
        Task<User> AuthenticateAsync(UserDTO userDto);

        User GetUserDetailsById(int userId);

        Task<User> GetUserByEmailAsync(string email);

        Task AddUserAsync(User user);

    }
}
