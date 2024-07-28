using Data_Access_Layer.Models;
using Microsoft.EntityFrameworkCore;

namespace Business_Layer.Data_Logic
{
    public class DataLogic : IDataLogic
    {

        private readonly CarDBContext _dbContext;

        public DataLogic(CarDBContext dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        /*public List<CarDetails> GetAllCarDetails()
        {
            return _dbContext.CarDetails.ToList();
        }*/

        public List<CarDetails> GetAllCarDetails()
        {
            var currentDate = DateTime.Now; // Get the current date and time

            // Retrieve all car details
            var carDetailsList = _dbContext.CarDetails.ToList();

            // Loop through each car detail and update Availability_status based on the conditions
            foreach (var carDetail in carDetailsList)
            {
                var rentalAgreementsForCar = _dbContext.RentalAgreement
                    .Where(ra =>
                        ra.Vehicle_Id == carDetail.Vehicle_Id &&
                        ra.BookingDate >= currentDate &&
                        ra.ReturnDate >= currentDate)
                    .ToList();

                // If there are active rental agreements, set Availability_status to "on rent"
                if (rentalAgreementsForCar.Any())
                {
                    carDetail.Availability_status = "onRent";
                }
                else
                {
                    // If no active rental agreements, set Availability_status to the default value
                    carDetail.Availability_status = "available";
                }
            }

            // Save changes to the database
            _dbContext.SaveChanges();

            return carDetailsList;
        }

        public List<RentalAgreement> GetAllRentalAgreements()
        {
            return _dbContext.RentalAgreement.ToList();
        }

        public CarDetails GetCarDetailsById(int vehicleId)
        {
            return _dbContext.CarDetails.FirstOrDefault(car => car.Vehicle_Id == vehicleId);
        }
        public void AddCarDetails(CarDetails carDetails)
        {
            if (carDetails == null)
            {
                throw new ArgumentNullException(nameof(carDetails));
            }

            _dbContext.CarDetails.Add(carDetails);
            _dbContext.SaveChanges();
        }
        public void UpdateCarDetails(int vehicleId, CarDetails updatedCarDetails)
        {
            if (updatedCarDetails == null)
            {
                throw new ArgumentNullException(nameof(updatedCarDetails));
            }

            var existingCarDetails = _dbContext.CarDetails.FirstOrDefault(car => car.Vehicle_Id == vehicleId);

            if (existingCarDetails != null)
            {
                existingCarDetails.Maker = updatedCarDetails.Maker;
                existingCarDetails.Model = updatedCarDetails.Model;
                existingCarDetails.Rental_Price = updatedCarDetails.Rental_Price;
                existingCarDetails.Availability_status = updatedCarDetails.Availability_status;
                existingCarDetails.Image_Link = updatedCarDetails.Image_Link;

                _dbContext.SaveChanges();
            }
        }

        public void DeleteCarDetails(int vehicleId)
        {
            var carToDelete = _dbContext.CarDetails.FirstOrDefault(car => car.Vehicle_Id == vehicleId);

            if (carToDelete != null)
            {
                _dbContext.CarDetails.Remove(carToDelete);
                _dbContext.SaveChanges();
            }
        }

        public void DeleteCarRentalDetails(int rentalAgreementId)
        {
            var carToDelete = _dbContext.RentalAgreement.FirstOrDefault(car => car.RentalAgreementId == rentalAgreementId);

            if (carToDelete != null)
            {
                _dbContext.RentalAgreement.Remove(carToDelete);
                _dbContext.SaveChanges();
            }
        }

        /*public async Task<RentalAgreement> CreateRentalAgreementAsync(
            int userId, int vehicleId, DateTime bookingDate, DateTime returnDate)
        {
            try
            {
                // Check if the user and car details exist
                var user = await _dbContext.User.FindAsync(userId);
                var carDetails = await _dbContext.CarDetails.FindAsync(vehicleId);

                if (user == null || carDetails == null)
                {
                    return null; // User or car details not found
                }

                // Create the rental agreement
                var rentalAgreement = new RentalAgreement
                {
                    UserId = userId,
                    Vehicle_Id = vehicleId,
                    BookingDate = bookingDate,
                    ReturnDate = returnDate,
                    IsReturned = "No", // You can set the initial value as needed
                    RequestForReturn = null // You can set the initial value as needed
                };

                // Add the rental agreement entity to the database
                _dbContext.RentalAgreement.Add(rentalAgreement);
                await _dbContext.SaveChangesAsync();

                // Load related entities explicitly
                await _dbContext.Entry(rentalAgreement)
                    .Reference(ra => ra.User)
                    .LoadAsync();

                await _dbContext.Entry(rentalAgreement)
                    .Reference(ra => ra.CarDetails)
                    .LoadAsync();

                return rentalAgreement; // Return the created rental agreement
            }
            catch (Exception ex)
            {
                // Handle exceptions appropriately
                return null; // Return null or handle the exception as needed
            }
        }*/


        /* public RentalAgreement CreateRentalAgreementAsync(int userId, int vehicleId)
         {
             try
             {
                 // Fetch the rental agreement based on userId and vehicleId
                 var rentalAgreement = _dbContext.RentalAgreement
                     .Include(ra => ra.User) // Explicitly include the User entity
                     .Include(ra => ra.CarDetails) // Explicitly include the CarDetails entity
                     .FirstOrDefault(ra => ra.UserId == userId && ra.Vehicle_Id == vehicleId);

                 if (rentalAgreement == null)
                 {
                     return null; // Rental agreement not found
                 }
                 return rentalAgreement; // Return the rental agreement with details
             }
             catch (Exception)
             {
                 // Handle exceptions appropriately
                 return null; // Return null or handle the exception as needed
             }
         }
        */


        public RentalAgreement CreateRentalAgreementAsync(int userId, int vehicleId)
        {
            try
            {
                // Check if the car details exist
                var carDetails = _dbContext.CarDetails.FirstOrDefault(cd => cd.Vehicle_Id == vehicleId);

                if (carDetails == null)
                {
                    return null; // Car details not found
                }

                // Check if the user exists
                var user = _dbContext.User.FirstOrDefault(u => u.UserId == userId);

                if (user == null)
                {
                    // Create the user if it does not exist
                    user = new User
                    {
                        UserId = userId,
                        // Set other user properties here as needed
                    };

                    // Add the user entity to the database
                    _dbContext.User.Add(user);
                }

                // Create the rental agreement
                var rentalAgreement = new RentalAgreement
                {
                    UserId = userId,
                    Vehicle_Id = vehicleId,
                   // BookingDate = bookingDate,
                    //ReturnDate = returnDate,
                    IsReturned = "No", // You can set the initial value as needed
                    RequestForReturn = null // You can set the initial value as needed
                };

                // Add the rental agreement entity to the database
                _dbContext.RentalAgreement.Add(rentalAgreement);
                _dbContext.SaveChanges();

                return rentalAgreement; // Return the created rental agreement
            }
            catch (Exception ex)
            {
                // Handle exceptions appropriately
                return null; // Return null or handle the exception as needed
            }
        }
        public RentalAgreement GetRentalAgreementById(int id)
        {
            return _dbContext.RentalAgreement.FirstOrDefault(ra => ra.RentalAgreementId == id);
        }
        public void UpdateRentalAgreement(RentalAgreement updatedRentalAgreement)
        {
            if (updatedRentalAgreement == null)
            {
                throw new ArgumentNullException(nameof(updatedRentalAgreement));
            }

            var existingRentalAgreement = _dbContext.RentalAgreement.FirstOrDefault(ra => ra.RentalAgreementId == updatedRentalAgreement.RentalAgreementId);

            if (existingRentalAgreement != null)
            {
                // Update the specific properties
                existingRentalAgreement.BookingDate = updatedRentalAgreement.BookingDate;
                existingRentalAgreement.ReturnDate = updatedRentalAgreement.ReturnDate;
                existingRentalAgreement.IsReturned = updatedRentalAgreement.IsReturned;
                existingRentalAgreement.RequestForReturn = updatedRentalAgreement.RequestForReturn;

                // Save changes to the database
                _dbContext.SaveChanges();
            }
        }

        public List<RentalAgreement> GetRentalAgreementsByVehicle_Id(int vehicleId)
        {
            var rentalAgreements = _dbContext.RentalAgreement
                .Where(ra => ra.Vehicle_Id == vehicleId)
                .Select(ra => new RentalAgreement
                {
                    RentalAgreementId = ra.RentalAgreementId,
                    UserId = ra.UserId,
                    Vehicle_Id = ra.Vehicle_Id,
                    BookingDate = ra.BookingDate,
                    ReturnDate = ra.ReturnDate,
                    IsReturned = ra.IsReturned,
                    RequestForReturn = ra.RequestForReturn
                })
                .ToList();

            return rentalAgreements;
        }


        public RentalAgreement CreateRentalAgreementAsync(RentalAgreement rentalAgreementDTO)
        {
            var newRentalAgreement = new RentalAgreement
            {
                UserId = rentalAgreementDTO.UserId,
                Vehicle_Id = rentalAgreementDTO.Vehicle_Id,
                BookingDate = rentalAgreementDTO.BookingDate,
                ReturnDate = rentalAgreementDTO.ReturnDate,
                IsReturned = rentalAgreementDTO.IsReturned,
                RequestForReturn = rentalAgreementDTO.RequestForReturn
            };

            _dbContext.RentalAgreement.Add(newRentalAgreement);
            _dbContext.SaveChangesAsync();

            rentalAgreementDTO.RentalAgreementId = newRentalAgreement.RentalAgreementId;
            return rentalAgreementDTO;
        }

    }

}

