import React, { useEffect, useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import styled from "@emotion/styled";
import AddTodo from "./components/AddTodo";
import callApi from "./libs/callApi";

function App() {
  const [items, setItems] = useState<Item[]>([]);

  const callData = async () => {
    try {
      const res = await callApi("/todo", "GET", null);
      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = (item: Item) => {
    callApi("/todo", "POST", item).then((res) => {
      setItems(res.data);
    });
  };

  const deleteItem = (item: Item) => {
    callApi("/todo", "DELETE", item).then((res) => {
      setItems(res.data);
    });
  };

  const updateItem = (item: Item) => {
    callApi("/todo", "PUT", item).then((res) => {
      setItems(res.data);
    });
  };

  useEffect(() => {
    callData();
  }, []);

  return (
    <Container className="App">
      <AddTodo addfn={addItem} />
      <ListWrapper>
        {items?.map((item) => (
          <li key={item.id}>
            <Todo item={item} deletefn={() => deleteItem(item)} updateItem={updateItem} />
          </li>
        ))}
      </ListWrapper>
    </Container>
  );
}

const Container = styled.div({
  margin: "16px",
});

const ListWrapper = styled.ul({
  listStyle: "none",
  padding: "0",
  margin: "0",
  boxShadow: "0px 0px 2px black",
});

export default App;
