using Microsoft.AspNetCore.Mvc;
using TodoDemo.Server.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TodoDemo.Server.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class TodoController : ControllerBase
  {
    // 模拟数据库：简单的内存数据存储
    private static List<Todo> Todos = new List<Todo>
        {
            new Todo { Id = 1, Title = "Learn ASP.NET Core", Description = "Study ASP.NET Core to build web applications", Completed=false },
            new Todo { Id = 2, Title = "Create Todo API", Description = "Develop a Todo API using ASP.NET Core", Completed=true}
        };

    // GET: api/todo
    [HttpGet]
    public ActionResult<IEnumerable<Todo>> GetTodos()
    {
      return Ok(Todos);
    }

    // GET: api/todo/5
    [HttpGet("{id}")]
    public ActionResult<Todo> GetTodoById(int id)
    {
      var todo = Todos.FirstOrDefault(t => t.Id == id);
      if (todo == null)
      {
        return NotFound(); // 返回 404 状态码
      }
      return Ok(todo);
    }

    // POST: api/todo
    [HttpPost]
    public ActionResult<Todo> CreateTodo(Todo todo)
    {
      // 给新Todo一个唯一的 Id
      todo.Id = Todos.Max(t => t.Id) + 1;
      Todos.Add(todo);
      return CreatedAtAction(nameof(GetTodoById), new { id = todo.Id }, todo);
    }

    // PUT: api/todo/5
    [HttpPut("{id}")]
    public IActionResult UpdateTodo(int id, Todo updatedTodo)
    {
      var existingTodo = Todos.FirstOrDefault(t => t.Id == id);
      if (existingTodo == null)
      {
        // 返回 404 状态码
        return NotFound();
      }

      // 更新现有 Todo 的内容
      existingTodo.Title = updatedTodo.Title;
      existingTodo.Description = updatedTodo.Description;
      existingTodo.Completed = updatedTodo.Completed;

      // 返回 204 状态码，表示成功但没有内容返回
      return NoContent();
    }

    // DELETE: api/todo/5
    [HttpDelete("{id}")]
    public IActionResult DeleteTodo(int id)
    {
      var todo = Todos.FirstOrDefault(t => t.Id == id);
      if (todo == null)
      {
        return NotFound(); // 返回 404 状态码
      }

      Todos.Remove(todo);
      return NoContent(); // 返回 204 状态码，表示删除成功但没有内容返回
    }
  }
}
