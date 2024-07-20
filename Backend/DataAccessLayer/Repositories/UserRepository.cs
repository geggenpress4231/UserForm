using DataAccessLayer.Data;
using DataAccessLayer.Interface;
using Medfar.Interview.Types;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Types.Dto;
using Types.Helper;

namespace Medfar.Interview.DAL.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDBContext _context;

        public UserRepository(ApplicationDBContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        // Retrieves all users based on the query object with pagination and search functionality
        public async Task<List<User>> GetAllAsync(QueryObject query)
        {
            try
            {
                var usersQuery = _context.Users.AsQueryable();

                if (!string.IsNullOrEmpty(query.SearchTerm))
                {
                    usersQuery = usersQuery.Where(u => u.email != null && u.email.Contains(query.SearchTerm));
                }

                return await usersQuery.OrderBy(u => u.date_created)
                                       .Skip(query.PageSize * (query.PageNumber - 1))
                                       .Take(query.PageSize)
                                       .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while retrieving all users.", ex);
            }
        }

        // Retrieves a user by ID
        public async Task<User> GetByIdAsync(Guid id)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.id == id);
                if (user == null)
                {
                    throw new ApplicationException($"User with ID {id} not found.");
                }

                return user;
            }
            catch (Exception ex)
            {
                throw new ApplicationException($"An error occurred while retrieving user with ID {id}.", ex);
            }
        }

        // Creates a new user
        public async Task<User> CreateAsync(User user)
        {
            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return user;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while creating a user.", ex);
            }
        }

        // Updates an existing user based on the provided ID and DTO
        public async Task<User?> UpdateAsync(Guid id, UpdateUserRequestDto userDto)
        {
            try
            {
                var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.id == id);
                if (existingUser == null)
                {
                    throw new ApplicationException("User not found.");
                }

                existingUser.first_name = !string.IsNullOrEmpty(userDto.first_name) ? userDto.first_name : existingUser.first_name;
                existingUser.last_name = !string.IsNullOrEmpty(userDto.last_name) ? userDto.last_name : existingUser.last_name;
                existingUser.email = !string.IsNullOrEmpty(userDto.email) ? userDto.email : existingUser.email;

                await _context.SaveChangesAsync();
                return existingUser;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while updating a user.", ex);
            }
        }

        // Deletes a user by ID
        public async Task<User?> DeleteAsync(Guid id)
        {
            try
            {
                var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.id == id);
                if (existingUser == null)
                {
                    throw new ApplicationException("User not found.");
                }

                _context.Users.Remove(existingUser);
                await _context.SaveChangesAsync();
                return existingUser;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while deleting a user.", ex);
            }
        }

        // Checks if an email exists
        public async Task<bool> EmailExistsAsync(string? email)
        {
            try
            {
                if (string.IsNullOrEmpty(email))
                {
                    return false;
                }

                return await _context.Users.AnyAsync(u => u.email == email);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while checking if email exists.", ex);
            }
        }

        // Checks if an email exists, excluding a specific user ID
        public async Task<bool> EmailExistsAsync(string? email, Guid excludingUserId)
        {
            try
            {
                if (string.IsNullOrEmpty(email))
                {
                    return false;
                }

                return await _context.Users.AnyAsync(u => u.email == email && u.id != excludingUserId);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while checking if email exists excluding user ID.", ex);
            }
        }
    }
}
