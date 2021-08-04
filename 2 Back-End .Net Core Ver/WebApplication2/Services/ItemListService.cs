using System;
using System.IO;
using System.Net;
using WebApplication2.Models;
using WebApplication2.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using System.Threading.Tasks;
using System.Diagnostics;

namespace WebApplication2.Services
{
    public interface IItemListService
    {
        ItemLocation DoesItemNameExist(string itemName);
        ItemLocation DoesItemIdExist(int itemId);
        int GenerateNewItemId();
        List<List<Item>> Get();
        string Post(string newItemName);
        string Put(int itemId, string newItemName);
        string Delete(int itemId);
        string Priority(int itemId);
        string Move(string arrow, string itemName);
    }
    public class ItemListService : IItemListService
    {
        private readonly IItemListRepository _itemListRepository;

        public ItemListService(IItemListRepository itemListRepository)
        {
            _itemListRepository = itemListRepository;
        }

        private static List<Item> PreviousItemList = new List<Item>();
        private static List<Item> CurrentItemList = new List<Item>();

        public ItemLocation DoesItemNameExist(string itemName)
        {
            List<List<Item>> collectionOfLists = Get();
            PreviousItemList = collectionOfLists[0];
            CurrentItemList = collectionOfLists[1];
            var previousListResult = PreviousItemList.Find(x => x.ItemName.ToLower() == itemName.ToLower());
            var currentListResult = CurrentItemList.Find(x => x.ItemName.ToLower() == itemName.ToLower());
            if (previousListResult == null && currentListResult == null)
            {
                return new ItemLocation {ItemListName = "not list", ItemIndex = - 1 };
            } 
            else
            {
                if (previousListResult == null)
                {
                    return new ItemLocation { ItemListName = "currentItemList", ItemIndex = CurrentItemList.IndexOf(currentListResult) };
                }
                else
                {
                    return new ItemLocation { ItemListName = "previousItemList", ItemIndex = PreviousItemList.IndexOf(previousListResult) };
                }
            }
        } 
        
        public ItemLocation DoesItemIdExist(int itemId)
        {
            List<List<Item>> collectionOfLists = Get();
            PreviousItemList = collectionOfLists[0];
            CurrentItemList = collectionOfLists[1];
            var previousListResult = PreviousItemList.Find(x => x.ItemId == itemId);
            var currentListResult = CurrentItemList.Find(x => x.ItemId == itemId);
            if (previousListResult == null && currentListResult == null)
            {
                return new ItemLocation { ItemListName = "not list", ItemIndex = -1 };
            }
            else
            {
                if (previousListResult == null)
                {
                    return new ItemLocation { ItemListName = "currentItemList", ItemIndex = CurrentItemList.IndexOf(currentListResult) };
                }
                else
                {
                    return new ItemLocation { ItemListName = "previousItemList", ItemIndex = PreviousItemList.IndexOf(previousListResult) };
                }
            }
        }

        public int GenerateNewItemId()
        {
            List<List<Item>> collectionOfLists = Get();
            PreviousItemList = collectionOfLists[0];
            CurrentItemList = collectionOfLists[1];
            List<int> numberOfListItems = Enumerable.Range(1, (PreviousItemList.Count + CurrentItemList.Count + 1)).ToList();
            foreach (Item iteration in PreviousItemList)
            {
                numberOfListItems.Remove(iteration.ItemId);
            }
            foreach (Item iteration in CurrentItemList)
            {
                numberOfListItems.Remove(iteration.ItemId);
            }
            return numberOfListItems[0];
        }

        public List<List<Item>> Get()
        {
            return _itemListRepository.Get();
        }

        public string Post(string newItemName)
        {
            if (DoesItemNameExist(newItemName).ItemIndex == -1)
            {
                Item newItem =  new Item() {
                    ItemId = GenerateNewItemId(), 
                    ItemName = newItemName, 
                    ItemPriority = false 
                };
                _itemListRepository.PostCurrent(newItem);
                return "success";       
            }
            return "item already exists"; // UPDATE STRING
        }

        public string Put(int itemId, string newItemName)
        {
            ItemLocation itemLocation = DoesItemNameExist(newItemName);
            if (itemLocation.ItemIndex != -1)
            {
                if (itemLocation.ItemListName == "previousItemList")
                {
                    Item itemChangingName = PreviousItemList[itemLocation.ItemIndex];
                    itemChangingName.ItemName = newItemName;
                    _itemListRepository.PutPrevious(itemLocation.ItemIndex, itemChangingName);
                    return "success";
                }
                else if (itemLocation.ItemListName == "currentItemList")
                {
                    Item itemChangingName = CurrentItemList[itemLocation.ItemIndex];
                    itemChangingName.ItemName = newItemName;
                    _itemListRepository.PutCurrent(itemLocation.ItemIndex, itemChangingName);
                    return "success";
                }
                else
                {
                    return "not valid list"; // UPDATE STRING
                }
            }
            else
            {
                return "item doesn't exists"; // UPDATE STRING
            }
        }

        public string Delete(int itemId)
        {
            ItemLocation itemLocation = DoesItemIdExist(itemId);
            if (itemLocation.ItemIndex != -1)
            {
                if (itemLocation.ItemListName == "previousItemList")
                {
                    _itemListRepository.DeletePrevious(itemLocation.ItemIndex);
                    return "success";
                }
                else if (itemLocation.ItemListName == "currentItemList")
                {
                    _itemListRepository.DeleteCurrent(itemLocation.ItemIndex);
                    return "success";
                }
                else
                {
                    return "not valid list"; // UPDATE STRING
                }
            }
            else
            {
                return "item doesn't exist"; // UPDATE STRING
            }
        }

        public string Priority(int itemId)
        {
            ItemLocation itemLocation = DoesItemIdExist(itemId);
            if (itemLocation.ItemIndex != -1)
            {
                if (itemLocation.ItemListName == "previousItemList")
                {
                    Item itemChangingPriority = PreviousItemList[itemLocation.ItemIndex];
                    itemChangingPriority.ItemPriority = !itemChangingPriority.ItemPriority;
                    _itemListRepository.PutPrevious(itemLocation.ItemIndex, itemChangingPriority);
                    return "success";
                }
                else if (itemLocation.ItemListName == "currentItemList")
                {
                    Item itemChangingPriority = CurrentItemList[itemLocation.ItemIndex];
                    itemChangingPriority.ItemPriority = !itemChangingPriority.ItemPriority;
                    if (itemChangingPriority.ItemPriority)
                    {
                        _itemListRepository.DeleteCurrent(itemLocation.ItemIndex);
                        _itemListRepository.MoveToStart(itemChangingPriority);
                    }
                    else
                    {
                        _itemListRepository.DeleteCurrent(itemLocation.ItemIndex);
                        _itemListRepository.PostCurrent(itemChangingPriority);
                    }
                    return "success";
                }
                else
                {
                    return "not valid list"; // UPDATE STRING
                }
            }
            else
            {
                return "item doesn't exist"; // UPDATE STRING
            }
        }

        public string Move(string arrow, string itemName)
        {
            ItemLocation itemLocation = DoesItemNameExist(itemName);
            if (itemLocation.ItemIndex != -1)
            {
                if (arrow == "previousToCurrent")
                {
                    if (itemLocation.ItemListName == "previousItemList")
                    {
                        var itemMoving = PreviousItemList[itemLocation.ItemIndex];
                        _itemListRepository.DeletePrevious(itemLocation.ItemIndex);
                        _itemListRepository.PostCurrent(itemMoving);
                        return "success";
                    }
                    else
                    {
                        return "item not in previous item list"; //UPDATE STRING
                    }
                }
                else if (arrow == "currentToPrevious")
                {
                    if (itemLocation.ItemListName == "currentItemList")
                    {
                        var itemMoving = CurrentItemList[itemLocation.ItemIndex];
                        _itemListRepository.DeleteCurrent(itemLocation.ItemIndex);
                        _itemListRepository.PostPrevious(itemMoving);
                        return "success";
                    }
                    else
                    {
                        return itemLocation.ItemListName; //UPDATE STRING
                    }
                }
                else if (arrow == "moveUp")
                {
                    if (itemLocation.ItemIndex > 0)
                    {
                        if (itemLocation.ItemListName == "currentItemList")
                        {
                            //Checks that the item is not at the top of the list and then whether it has a priority flag
                            // and if it doesn't, it then ensures that it can't move above a priority item
                            if (CurrentItemList[itemLocation.ItemIndex].ItemPriority || CurrentItemList[itemLocation.ItemIndex - 1].ItemPriority)
                            {
                                var itemMovedUp = CurrentItemList[itemLocation.ItemIndex];
                                _itemListRepository.PutCurrent(itemLocation.ItemIndex, CurrentItemList[itemLocation.ItemIndex - 1]);
                                _itemListRepository.PutCurrent(itemLocation.ItemIndex-1, itemMovedUp);
                                return "success";
                            }
                            else
                            {
                                return "capped above by priority flag";
                            }
                        }
                        else
                        {
                            var itemMovedUp = PreviousItemList[itemLocation.ItemIndex];
                            _itemListRepository.PutPrevious(itemLocation.ItemIndex, PreviousItemList[itemLocation.ItemIndex - 1]);
                            _itemListRepository.PutPrevious(itemLocation.ItemIndex - 1, itemMovedUp);
                            return "success";
                        }
                    }
                    else
                    {
                        return "item on top";
                    }
                }
                else if (arrow == "moveDown")
                {
                    if (itemLocation.ItemListName == "currentItemList")
                    {
                        if (itemLocation.ItemIndex < CurrentItemList.Count - 1)
                        {
                            //Checks that the item is not at the bottom of the list and then whether it hasn't got a priority flag
                            //and if it does have a flag, it then ensures that it can't move below a non-priority item
                            if (!CurrentItemList[itemLocation.ItemIndex].ItemPriority || CurrentItemList[itemLocation.ItemIndex + 1].ItemPriority)
                            {
                                var itemMovedDown = CurrentItemList[itemLocation.ItemIndex];
                                _itemListRepository.PutCurrent(itemLocation.ItemIndex, CurrentItemList[itemLocation.ItemIndex + 1]);
                                _itemListRepository.PutCurrent(itemLocation.ItemIndex + 1, itemMovedDown);
                                return "success";
                            }
                            else
                            {
                                return "capped below by priority flag";
                            }
                        }
                        else
                        {
                            return "item on bottom";
                        }
                    }
                    else
                    {
                        if (itemLocation.ItemIndex < PreviousItemList.Count - 1)
                        {
                            var itemMovedDown = PreviousItemList[itemLocation.ItemIndex];
                            _itemListRepository.PutPrevious(itemLocation.ItemIndex, PreviousItemList[itemLocation.ItemIndex + 1]);
                            _itemListRepository.PutPrevious(itemLocation.ItemIndex + 1, itemMovedDown);
                            return "success";
                        }
                        else
                        {
                            return "item on bottom";
                        }
                    }
                    
                }
                else
                {
                    return "button pressed doesn't exist"; // UPDATE STRING
                }
            }
            else
            {
                return "item doesn't exist"; // UPDATE STRING
            }
        }
    }
}