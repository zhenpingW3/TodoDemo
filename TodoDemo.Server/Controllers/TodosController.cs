using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using TodoDemo.Server.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TodoDemo.Server.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class TodosController : ControllerBase
  {
    List<Todo> todoList;

    public TodosController() : base()
    {
      this.todoList = new List<Todo>() {
      new Todo(){ Id=1, Title="Title1", Description="Description1" },
      new Todo(){ Id=2, Title="Title2", Description="Description2" },
      new Todo(){ Id=3, Title="Title3", Description="Description3" }
      };
    }

    // GET: api/<TodoController>
    [HttpGet]
    public async Task<IEnumerable<Todo>> Get()
    {
      return await Task.FromResult(this.todoList);
    }

    // GET api/<TodoController>/5
    [HttpGet("{id}")]
    public async Task<Todo> Get(int id)
    {
      return await Task.FromResult(this.todoList.First(x => x.Id == id));
    }

    // POST api/<TodoController>
    [HttpPost]
    public ActionResult Post(int id, Todo todo)
    {
      if (id != todo.Id)
      {
        return BadRequest();
      }

      var update = this.todoList.Find(x => x.Id == id);
      if (update == null) return NotFound();

      update.Title = todo.Title;
      update.Description = todo.Description;

      return Ok(update);
    }

    // DELETE api/<TodoController>/5
    [HttpDelete("{id}")]
    public Task<IActionResult> Delete(int id)
    {
      var todo = this.todoList.Find(x => x.Id == id);
      if (todo == null) return Task.FromResult<IActionResult>(NotFound());

      this.todoList.Remove(todo);

      return Task.FromResult<IActionResult>(NoContent());
    }
  }
}
