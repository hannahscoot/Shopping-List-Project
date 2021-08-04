UPDATE [database name].dbo.ShoppingList
SET name = @name, priority = @priority, listId = @listId
WHERE id = @id;
