import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');
  const [data, setdata] = useState({title:"",body:"",author:"mario"})
  const handelData=({target})=>{
    const {name,value}=target
    setdata((pre)=>{
      return {...pre,[name]:value}
    })
  }
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = data;
    setdata({title:"",body:"",author:""})

    fetch('http://localhost:8000/blogs/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
      navigate('/'); 
    })
  }

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={handelData}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={handelData}
        ></textarea>
        <label>Blog author:</label>
        <select
          value={author}
          onChange={handelData}
        >
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        <button>Add Blog</button>
      </form>
    </div>
  );
}

export default Create;
