using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Medfar.Interview.Types;
using Types.Dto;

namespace Types.Mapper
{
    public static class UserMapper
    {
        public static UserDto ToUserDto(this User userModel)
        {
            return new UserDto
            {
               id = userModel.id,
               first_name=userModel.first_name,
               last_name=userModel.last_name,
               email=userModel.email,
               date_created=userModel.date_created
             
            };

        }
        public static User ToUserFromCreateDTO(this CreateUserRequestDto createUserRequestDto)
        {
            return new User
            {
                id = Guid.NewGuid(),
                first_name = createUserRequestDto.first_name,
                last_name = createUserRequestDto.last_name,
                email = createUserRequestDto.email,
                date_created = createUserRequestDto.date_created
            };
        }
    

    }
}