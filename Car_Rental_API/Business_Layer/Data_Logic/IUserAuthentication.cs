using Data_Access_Layer.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Layer.Data_Logic
{
    public interface IUserAuthentication
    {
        Task<string> AuthenticateAsync(NewLoginDto userLoginDto);
        Task<string> RegisterAsync(UserDTO userRegisterDto);
    }
}
