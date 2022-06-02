import React, { useEffect, useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import styled from "@emotion/styled";
import AddTodo from "./components/AddTodo";
import callApi from "./libs/callApi";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const callData = async () => {
    setIsLoading(true);
    try {
      const res = await callApi("/todo", "GET", null);
      setItems(res.data);
    } catch (error) {
      console.log(error);
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = async (item: Item) => {
    try {
      const res = await callApi("/todo", "POST", item);
      setItems(() => res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteItem = async (item: Item) => {
    try {
      const res = await callApi("/todo", "DELETE", item);
      setItems(() => res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const updateItem = async (item: Item) => {
    try {
      const res = await callApi("/todo", "PUT", item);
      setItems(() => res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    callData();
  }, []);

  if (isLoading) return <div>Loading</div>;

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
