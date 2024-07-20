using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Types.Helper;
using Medfar.Interview.Types;
using Types.Dto;

namespace Application.Interface
{
    public interface IUserService
    {
        Task<List<UserDto>> GetAll(QueryObject query);

        Task<UserDto> GetById(Guid id);
        Task<UserDto> CreateAsync(CreateUserRequestDto userDto);

        Task<UserDto?> UpdateAsync(Guid id, UpdateUserRequestDto userDto);

        Task<bool> DeleteAsync(Guid id);
    }
}