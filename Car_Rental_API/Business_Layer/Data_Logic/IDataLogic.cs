using Data_Access_Layer.Models;
namespace Business_Layer.Data_Logic
{
    public interface IDataLogic
    {
       
        List<CarDetails> GetAllCarDetails();
        List<RentalAgreement> GetAllRentalAgreements();
        RentalAgreement CreateRentalAgreementAsync(int userId, int vehicleId);
        CarDetails GetCarDetailsById(int vehicleId);
        
        void AddCarDetails(CarDetails carDetails);
        void UpdateCarDetails(int vehicleId, CarDetails updatedCarDetails);
        void DeleteCarDetails(int vehicleId);
        void UpdateRentalAgreement(RentalAgreement updatedRentalAgreement);
        RentalAgreement GetRentalAgreementById(int id);
        void DeleteCarRentalDetails(int rentalAgreementId);

        List<RentalAgreement> GetRentalAgreementsByVehicle_Id(int vehicleId);


        RentalAgreement CreateRentalAgreementAsync(RentalAgreement rentalAgreementDTO);

    }
}

