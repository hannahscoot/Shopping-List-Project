using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using WebApplication2.Models;

namespace WebApplication2.Repositories
{
    public interface IItemListRepository
    {
        List<List<Item>> Get();
        void PostCurrent(Item item);
        void PostPrevious(Item item);
        void PutCurrent(int itemIndex, Item itemName);
        void PutPrevious(int itemIndex, Item itemName);
        void DeleteCurrent(int itemIndex);
        void DeletePrevious(int itemIndex);
        void MoveToStart(Item item);
    }

    public class ItemListRepository : IItemListRepository 
    {
        private static List<Item> PreviousItemList = new List<Item>()
        {
            new Item
            {
                ItemId = 1,
                ItemName = "Bananas",
                ItemPriority = false
            },
            new Item
            {
                ItemId = 2,
                ItemName = "Biscuits",
                ItemPriority = false
            },
            new Item
            {
                ItemId = 3,
                ItemName = "Bread",
                ItemPriority = false
            },
            new Item
            {
                ItemId = 4,
                ItemName = "Cereal",
                ItemPriority = false
            },
            new Item
            {
                ItemId = 5,
                ItemName = "Milk",
                ItemPriority = false
            },
            new Item
            {
                ItemId = 6,
                ItemName = "Sugar",
                ItemPriority = false
            },
            new Item
            {
                ItemId = 7,
                ItemName = "Tea Bags",
                ItemPriority = false
            }

        };
        private static List<Item> CurrentItemList = new List<Item>();

        public List<List<Item>> Get()
        {
            return new List<List<Item>>()
            {
                PreviousItemList,
                CurrentItemList
            };
        }
        public void PostCurrent(Item item)
        {
            CurrentItemList.Add(item);
        }
        public void PostPrevious(Item item)
        {
            PreviousItemList.Add(item);
        }
        public void PutCurrent(int itemIndex, Item item)
        {
            CurrentItemList[itemIndex] = item;
        }
        public void PutPrevious(int itemIndex, Item item)
        {
            PreviousItemList[itemIndex] = item;
        }
        public void DeleteCurrent(int itemIndex)
        {
            CurrentItemList.RemoveAt(itemIndex);
        }
        public void DeletePrevious(int itemIndex)
        {
            PreviousItemList.RemoveAt(itemIndex);
        }
        public void MoveToStart(Item item)
        {
            CurrentItemList.Insert(0, item);
        }
    }
}