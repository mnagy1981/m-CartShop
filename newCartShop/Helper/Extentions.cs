using Microsoft.AspNetCore.Http;
using newCartShop.Helper;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace CartShop.Helper
{
    public static class Extentions
    {
        public static void AddAplicationError(this HttpResponse response,string message)
        {
            response.Headers.Add("Application-Error",message);
             response.Headers.Add("Access-Control-Expose-Headers","Application-Error");
               response.Headers.Add("Access-Control-Allow-Origin","*");


        }
        public static void AddPagination(this HttpResponse response,int currentPage,
        int itemsPerPage,int totalItems,int totalPages)
        {
            var paginationHeader=new PaginationHeader(currentPage,itemsPerPage,
             totalItems, totalPages);
            var calmelCaseFormatter=new JsonSerializerSettings();
            calmelCaseFormatter.ContractResolver=new CamelCasePropertyNamesContractResolver();

            response.Headers.Add("Pagination",
            JsonConvert.SerializeObject(paginationHeader, calmelCaseFormatter));
             response.Headers.Add("Access-Control-Expose-Headers","Pagination");

        }
    }
}