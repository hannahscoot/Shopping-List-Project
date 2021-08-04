select * from [database name].dbo.ShoppingList
where listId = @listId
order by priority DESC, name