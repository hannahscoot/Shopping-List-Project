using System;
using System.IO;
using System.Net;
using Microsoft.Extensions.Configuration;
using WebApplication2.Models;
using WebApplication2.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using System.Threading.Tasks;
using System.Diagnostics;

namespace WebApplication2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemListAPIController : ControllerBase
    {

        private readonly IItemListService _itemListservice;

        public ItemListAPIController(IItemListService itemListService)
        {
            _itemListservice = itemListService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_itemListservice.Get());
            }
            catch (Exception)
            {
                //Couldn't get item for some reason
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] string itemName)
        {
            if (ModelState.IsValid == false) return BadRequest(ModelState);
            try
            {
                return Ok(_itemListservice.Post(itemName));
            }
            catch (Exception)
            {
                //Couldn't add item for some reason
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        [HttpPut("{itemId}/{newItemName}")]
        public IActionResult Put(int itemId, string newItemName)
        {
            if (ModelState.IsValid == false) return BadRequest(ModelState);
            try
            {
                return Ok(_itemListservice.Put(itemId, newItemName));
            }
            catch (Exception)
            {
                //Couldn't edit item name for some reason
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        [HttpDelete("{itemId}")]
        public IActionResult Delete(int itemId)
        {
            if (ModelState.IsValid == false) return BadRequest(ModelState);
            try
            {
                return Ok(_itemListservice.Delete(itemId));
            }
            catch (Exception)
            {
                //Couldn't delete item for some reason
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        [HttpPut("priority/{itemId}")]
        public IActionResult PriorityToggle(int itemId)
        {
            if (ModelState.IsValid == false) return BadRequest(ModelState);
            try
            {
                return Ok(_itemListservice.Priority(itemId));
            }
            catch (Exception)
            {
                //Couldn't change item priortiy for some reason
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        [HttpPut("move/{arrowDirection}/{itemName}")]
        public IActionResult MoveItem(string arrowDirection, string itemName)
        {
            if (ModelState.IsValid == false) return BadRequest(ModelState);
            try
            {
                return Ok(_itemListservice.Move(arrowDirection, itemName));
            }
            catch (Exception)
            {
                //Couldn't move item to other list for some reason
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        // Move these methods to ItemListRepository @ later date
        //[HttpPost("tojson/{saveListName}/{toListName}")]
        //public IActionResult ToJson(string savelistName, string toListName)
        //{
        //    if (ModelState.IsValid == false) return BadRequest(ModelState);
        //    try
        //    {
        //        if (savelistName == "currentItemList")
        //        {
        //            string path = "jsonfiles/" + toListName + ".txt";
        //            using (StreamWriter sw = new StreamWriter(path))
        //            {
        //                JsonSerializer serializer = new JsonSerializer();
        //                serializer.Serialize(sw, CurrentItemList);
        //            }
        //            return Ok("success");
        //        }
        //        else if (savelistName == "previousItemList")
        //        {
        //            string path = "jsonfiles/" + toListName + ".txt";
        //            using (StreamWriter sw = new StreamWriter(path))
        //            {
        //                JsonSerializer serializer = new JsonSerializer();
        //                serializer.Serialize(sw, PreviousItemList);
        //            }
        //            return Ok("success");
        //        }
        //        else
        //        {
        //            return Ok("not valid list");
        //        }
        //    }
        //    catch (Exception)
        //    {
        //        return StatusCode((int)HttpStatusCode.InternalServerError);
        //    }
        //}

        //[HttpGet("fromjson/{saveListName}/{tolistName}")]
        //public IActionResult FromJson(string saveListName, string toListName)
        //{
        //    if (ModelState.IsValid == false) return BadRequest(ModelState);
        //    try
        //    {
        //        if (saveListName == "currentItemList")
        //        {
        //            string path = "jsonfiles/" + toListName + ".txt"; ;
        //            using (StreamReader sr = new StreamReader(path))
        //            {
        //                CurrentItemList = JsonConvert.DeserializeObject<List<Item>>(sr.ReadToEnd());
        //            }
        //            foreach (Item item in CurrentItemList)
        //            {
        //                Item result = PreviousItemList.Find(x => x.ItemName.ToLower() == item.ItemName.ToLower());
        //                if (result != null)
        //                {
        //                    PreviousItemList.Remove(result);
        //                }
        //            }
        //            return Ok("success");
        //        } else if (saveListName == "previousItemList")
        //        {
        //            string path = "jsonfiles/" + toListName + ".txt"; ;
        //            using (StreamReader sr = new StreamReader(path))
        //            {
        //                PreviousItemList = JsonConvert.DeserializeObject<List<Item>>(sr.ReadToEnd());
        //            }
        //            foreach (Item item in PreviousItemList)
        //            {
        //                Item result = CurrentItemList.Find(x => x.ItemName.ToLower() == item.ItemName.ToLower());
        //                if (result != null)
        //                {
        //                    CurrentItemList.Remove(result);
        //                }
        //            }
        //            return Ok("success");
        //        }
        //        else
        //        {
        //            return Ok("not valid list");
        //        }
        //    }
        //    catch (Exception)
        //    {
        //        return StatusCode((int)HttpStatusCode.InternalServerError);
        //    }
        //}
    }
}