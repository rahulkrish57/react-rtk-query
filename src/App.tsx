import React from "react";
import "./App.css";
import {
  useContactsQuery,
  useContactQuery,
  useAddContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} from "./services/contactsApi";

function App() {
  const { data, error, isLoading, isFetching, isSuccess } = useContactsQuery();
  console.log(data);
  return (
    <div className="App">
      <h1>React Redux Toolkit RTK Query Tutorial</h1>
      {isLoading && <h4>...Loading</h4>}
      {/* {isFetching && <h2>...isFetching</h2>} */}
      {error && <h2>Something went wrong</h2>}
      {isSuccess && (
        <div>
          {data?.map((contact) => {
            return (
              <div className="data" key={contact.id}>
                <h4>{contact.name}</h4>
                <span>
                  <ContactDetail id={contact.id} />
                </span>
              </div>
            );
          })}
        </div>
      )}
      <div>
        <AddContact />
      </div>
    </div>
  );
}

export const ContactDetail = ({ id }: { id: string }) => {
  const { data, isLoading } = useContactQuery(id);
  return (
    <pre>{isLoading ? "...Loading" : JSON.stringify(data, undefined, 2)}</pre>
  );
};

export const AddContact = () => {
  const [addContact] = useAddContactMutation();
  const [updateContact] = useUpdateContactMutation();
  const [deleteContact] = useDeleteContactMutation();
  const { refetch } = useContactsQuery();
  const contact = {
    id: "3",
    name: "Sandy S",
    email: "sandys@hotmail.com",
  };

  const addHandler = async () => {
    await addContact(contact);
    // refetch();
  };
  const updateHandler = async () => {
    await updateContact(contact);
  };
  const deleteHandler = async () => {
    await deleteContact("3");
  };
  return (
    <>
      <button onClick={addHandler}>Add Contact</button>
      <button onClick={updateHandler}>Update Contact</button>
      <button onClick={deleteHandler}>Delete Contact</button>
    </>
  );
};

export default App;
