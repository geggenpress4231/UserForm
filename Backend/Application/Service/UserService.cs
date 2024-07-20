using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Types.Helper;
using Application.Interface;
using DataAccessLayer.Interface;
using Medfar.Interview.Types;
using Types.Dto;
using Types.Mapper;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        // Constructor dependency injection for IUserRepository
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // Retrieves all users based on the query object, maps entities to DTOs
        public async Task<List<UserDto>> GetAll(QueryObject query)
        {
            var users = await _userRepository.GetAllAsync(query);
            return users.Select(s => s.ToUserDto()).ToList();
        }

        // Retrieves a user by ID, maps the entity to a DTO
        public async Task<UserDto> GetById(Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            return user?.ToUserDto() ?? new UserDto(); 
        }


        // Creates a new user after validating the uniqueness of the email and maps the DTO to the entity
        public async Task<UserDto> CreateAsync(CreateUserRequestDto userDto)
        {
            // Check for unique email
            if (await _userRepository.EmailExistsAsync(userDto.email))
            {
                throw new ValidationException("Email already exists.");
            }

            // Map DTO to entity
            var userModel = userDto.ToUserFromCreateDTO();

            // Save to repository
            var createdUser = await _userRepository.CreateAsync(userModel);

            // Map entity to DTO
            return createdUser.ToUserDto();
        }

        // Updates an existing user based on the provided ID and DTO
        public async Task<UserDto?> UpdateAsync(Guid id, UpdateUserRequestDto userDto)
        {
            try
            {
                var updatedUser = await _userRepository.UpdateAsync(id, userDto);
                if (updatedUser == null)
                {
                    throw new KeyNotFoundException("User not found.");
                }
                return updatedUser.ToUserDto();
            }
            catch (ValidationException ex)
            {
                // Log validation exception if necessary
                throw new ApplicationException("Validation error occurred.", ex);
            }
            catch (KeyNotFoundException ex)
            {
                // Log key not found exception if necessary
                throw new ApplicationException("User not found.", ex);
            }
            catch (Exception ex)
            {
                // Log any other unexpected exceptions
                throw new ApplicationException("An unexpected error occurred.", ex);
            }
        }

        // Deletes a user by ID and returns true if successful
        public async Task<bool> DeleteAsync(Guid id)
        {
            try
            {
                var deletedUser = await _userRepository.DeleteAsync(id);
                if (deletedUser == null)
                {
                    throw new KeyNotFoundException("User not found.");
                }
                return true;
            }
            catch (KeyNotFoundException ex)
            {
                // Log key not found exception if necessary
                throw new ApplicationException("User not found.", ex);
            }
            catch (Exception ex)
            {
                // Log any other unexpected exceptions
                throw new ApplicationException("An unexpected error occurred.", ex);
            }
        }
    }
}
