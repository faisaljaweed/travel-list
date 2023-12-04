import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Backets", quantity: 3, packed: false },
// ];



export default function App(){
  const [items,setitem]=useState([]);
  function handleAdditem(item){
    setitem((items)=>[...items,item])
  }
  function ClearItem(){
    const confirmed =window.confirm("Are you sure you want delete all items")
    if(confirmed)
       setitem([]);
  }
  function handleDeleteitem(id){
    setitem((items)=>items.filter((item)=>item.id!==id))
  }

  function handleToggleItem(id){
    setitem((items)=>
    items.map((item)=>
    item.id ===id ? {...item,packed:!item.packed}
    :item))
  }
  return(

    <div className="app">
      <Logo/>
      <Form onAddItem={handleAdditem}/>
      <PackageList items={items} onDeleteItem={handleDeleteitem} onToggleItem={handleToggleItem} onClearItem={ClearItem}/>
      <Stats item={items}/>
    </div>
  );
}
function Logo(){
  return(
    <div>
      <h1>🌴Far Away 💼</h1>
    </div>
  );
}
function Form({onAddItem}){
  const [description,setDiscription]=useState("");
  const [quantity , setquantity ]=useState(1);
  

  function handleSubmit(e){
    e.preventDefault();

    if (!description) return;
    const newItem={
      description,quantity,packed:false,id:Date.now()
    }
    // console.log(newItem);
    onAddItem(newItem)
    setDiscription("");
    setquantity(1);
  }
return(
  <form className="add-form" onSubmit={handleSubmit}> 
    <h3>What you need for your 😍 trip?</h3>
    <select value={quantity} onChange={(e)=>setquantity(e.target.value)}>
      {Array.from({length:20},(_,i)=>i+1).map((num)=>(<option value={num} key={num}> {num} </option>))}
    </select>
    <input type="text" placeholder="Item.." value={description} onChange={(e)=>setDiscription(e.target.value)}/>
    <button>Add</button>
  </form>
);
}
function PackageList({items,onDeleteItem,onToggleItem,onClearItem}){
  const [sortBy,setsortBy]=useState("input");
  let sorteditem;
  if(sortBy=="input") sorteditem=items;
  if(sortBy=="description") sorteditem=items.slice().sort((a,b)=>a.description.localeCompare(b.description));
  if(sortBy=="packed") sorteditem=items.slice().sort((a,b)=>Number(a.packed)-Number(b.packed));
  return(
    <div className="list">
      <ul>
      {sorteditem.map((item)=>(<Item item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} key={item.id}/>))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e)=>setsortBy(e.target.value)}>
          <option value="input">Sort by input item</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by Packed item</option>

        </select>
        <button onClick={onClearItem}>Clear</button>
      </div>
    </div>
  );
}

function Item({item,onDeleteItem,onToggleItem}){
  return(
  <li>
    <input type="checkbox" value={item.packed} 
    onChange={()=>onToggleItem(item.id)}/>
    <span style={item.packed ? {textDecoration:"line-through"} : {} }>  
    {item.quantity} {item.description}
    </span>
    <button onClick={()=> onDeleteItem(item.id)}>❌</button>
  </li>
  );
}
function Stats({item}){
  if(!item.length)return<p className="stats"><em>Start adding some items to your packing list 🚀</em> </p>
  const numitem=item.length;
  const numPacked=item.filter((item)=>item.packed).length;
  const percentage = Math.round((numPacked/numitem)*100);
  return(
    <footer className="stats">
      <em>
        {percentage===100?"You got every thing ready to go ✈️" :`💼You have ${numitem} times on your lsit. and you already packed ${numPacked} ( ${percentage}%)`}
        </em>
    </footer>
  );
}