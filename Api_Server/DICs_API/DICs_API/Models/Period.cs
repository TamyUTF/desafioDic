using System;
using System.ComponentModel.DataAnnotations;

namespace DICs_API.Models
{
    public class Period
    {
        /// <summary>
        /// Id do período
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// Início do período
        /// </summary>
        [Required]
        public DateTime StartDate { get; set; }
        /// <summary>
        /// Quantidade de meses
        /// </summary>
        [Required]
        public int Months { get; set; }
        /// <summary>
        /// Término do período
        /// </summary>
        [Required]
        public DateTime EndDate { get; set; }
        /// <summary>
        /// Período
        /// </summary>
        [Required]
        public string Name { get; set; }
        /// <summary>
        /// Se está inativo
        /// </summary>
        public byte Removed { get; set; }
    }
}
