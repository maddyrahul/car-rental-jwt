
using NSwag.Annotations;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Data_Access_Layer.Models
{
    [Table("CarDetails")]
    public class CarDetails
    {
        [Key]
        
        public int Vehicle_Id { get; set; }

        [MaxLength(100)]
        [Required]
        public string? Maker { get; set; }

        [MaxLength(100)]
        [Required]
        public string? Model { get; set; }

        [Required]
        [Range(0.06, 100000.00, ErrorMessage = "Rental Price must be between 0.01 and 10,0000.00")]
        public double? Rental_Price { get; set; }

        [Required(ErrorMessage = "Availability status is required.")]
        [MaxLength(50)]
        public string? Availability_status { get; set; }

        public string? Image_Link { get; set; }

        [JsonIgnore]
        public List<RentalAgreement>? RentalAgreements { get; set; }
    }
}
