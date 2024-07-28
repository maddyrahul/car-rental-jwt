using Business_Layer.Data_Logic;
using Data_Access_Layer.DTO;
using Data_Access_Layer.Models;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Presentation_Layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarDetailsController : ControllerBase
    {
        private readonly IDataLogic _carService;

        public CarDetailsController(IDataLogic carDetailsService)
        {
            _carService = carDetailsService ?? throw new ArgumentNullException(nameof(carDetailsService));
        }

        [HttpGet("GetAllCarDetails")]
        public ActionResult<IEnumerable<CarDetails>> GetAllCarDetails()
        {
            try
            {
                var carDetails = _carService.GetAllCarDetails();
                return Ok(carDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetAllRentalAgreements")]
        public ActionResult<IEnumerable<RentalAgreement>> GetAllRentalAgreements()
        {
            try
            {
                var carDetails = _carService.GetAllRentalAgreements();
                return Ok(carDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetCarDetailById/{id}")]
        public ActionResult<CarDetails> GetCarDetailsById(int id)
        {
            try
            {
                var carDetails = _carService.GetCarDetailsById(id);

                if (carDetails == null)
                {
                    return NotFound();
                }

                return Ok(carDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetRentalAgreementById/{id}")]
        public ActionResult<RentalAgreement> GetRentalAgreementById(int id)
        {
            try
            {
                var carDetails = _carService.GetRentalAgreementById(id);

                if (carDetails == null)
                {
                    return NotFound();
                }

                return Ok(carDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("AddCarDetails")]
        public IActionResult AddCarDetails([FromBody] CarDetails carDetails)
        {
            try
            {
                if (carDetails == null)
                {
                    return BadRequest();
                }

                _carService.AddCarDetails(carDetails);
                return CreatedAtAction(nameof(GetCarDetailsById), new { id = carDetails.Vehicle_Id }, carDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("UpdateCarDetails/{id}")]
        public IActionResult UpdateCarDetails(int id, [FromBody] CarDetails updatedCarDetails)
        {
            try
            {
                if (updatedCarDetails == null || id != updatedCarDetails.Vehicle_Id)
                {
                    return BadRequest();
                }

                var existingCarDetails = _carService.GetCarDetailsById(id);

                if (existingCarDetails == null)
                {
                    return NotFound();
                }

                _carService.UpdateCarDetails(id, updatedCarDetails);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("DeleteCarDetails/{id}")]
        public IActionResult DeleteCarDetails(int id)
        {
            try
            {
                var existingCarDetails = _carService.GetCarDetailsById(id);

                if (existingCarDetails == null)
                {
                    return NotFound();
                }

                _carService.DeleteCarDetails(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("DeleteCarRentalDetails/{rentalAgreementId}")]
        public IActionResult DeleteCarRentalDetails(int rentalAgreementId)
        {
            try
            {
                var existingCarDetails = _carService.GetRentalAgreementById(rentalAgreementId);

                if (existingCarDetails == null)
                {
                    return NotFound();
                }

                _carService.DeleteCarRentalDetails(rentalAgreementId);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("CreateRentalAgreement/{userId}/{vehicleId}")]
        public IActionResult CreateRentalAgreementWithDetails(int userId, int vehicleId)
        {
            try
            {
                var rentalAgreementWithDetails = _carService.CreateRentalAgreementAsync(userId, vehicleId);

                if (rentalAgreementWithDetails == null)
                {
                    return BadRequest("Unable to create rental agreement.");
                }

                return Ok(rentalAgreementWithDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("UpdateRentalAgreement/{id}")]
        public IActionResult UpdateRentalAgreement(int id, [FromBody] RentalAgreement updatedRentalAgreement)
        {
            try
            {
                if (updatedRentalAgreement == null || id != updatedRentalAgreement.RentalAgreementId)
                {
                    return BadRequest();
                }

                var existingRentalAgreement = _carService.GetRentalAgreementById(id);

                if (existingRentalAgreement == null)
                {
                    return NotFound();
                }

                existingRentalAgreement.BookingDate = updatedRentalAgreement.BookingDate;
                existingRentalAgreement.ReturnDate = updatedRentalAgreement.ReturnDate;
                existingRentalAgreement.IsReturned = updatedRentalAgreement.IsReturned;
                existingRentalAgreement.RequestForReturn = updatedRentalAgreement.RequestForReturn;

                _carService.UpdateRentalAgreement(existingRentalAgreement);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetRentalAgreementsByVehicle_Id/{vehicleId}")]
        public ActionResult<List<RentalAgreement>> GetRentalAgreementsByVehicle_Id(int vehicleId)
        {
            try
            {
                var rentalAgreements = _carService.GetRentalAgreementsByVehicle_Id(vehicleId);
                return Ok(rentalAgreements);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPost("CreateAgreement")]
        public IActionResult CreateRentalAgreementAsync([FromBody] RentalAgreement rentalAgreementDTO)
        {
            if (rentalAgreementDTO == null)
            {
                return BadRequest("Invalid data");
            }

            var createdRentalAgreement = _carService.CreateRentalAgreementAsync(rentalAgreementDTO);

            // Return the newly created rental agreement with its ID
            return Ok(createdRentalAgreement);
        }
    }

}
