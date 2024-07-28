
using Microsoft.EntityFrameworkCore;

namespace Data_Access_Layer.Models
{
    public class CarDBContext : DbContext
    {
        public CarDBContext(DbContextOptions<CarDBContext> options) : base(options)
        {
            CarDetails = Set<CarDetails>();
            User = Set<User>();
            RentalAgreement = Set<RentalAgreement>();
            
        }

        public DbSet<CarDetails> CarDetails { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<RentalAgreement> RentalAgreement { get; set; }

       

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RentalAgreement>()
                .HasOne(ra => ra.User)
                .WithMany(u => u.RentalAgreements)
                .HasForeignKey(ra => ra.UserId);

            modelBuilder.Entity<RentalAgreement>()
                .HasOne(ra => ra.CarDetails)
                .WithMany(cd => cd.RentalAgreements)
                .HasForeignKey(ra => ra.Vehicle_Id);
        }
    }
}
