using Types.Helper;
using Medfar.Interview.Types;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Types.Dto;

namespace DataAccessLayer.Interface
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllAsync(QueryObject query);
        Task<User> CreateAsync(User user);

        Task<bool> EmailExistsAsync(string? email);

        Task<bool> EmailExistsAsync(string? email, Guid id);

        Task<User> GetByIdAsync(Guid id);
        Task<User?> UpdateAsync(Guid id, UpdateUserRequestDto userDto);

        Task<User?> DeleteAsync(Guid id);
    }
}
