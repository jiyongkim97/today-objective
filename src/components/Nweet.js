import { dbService } from "../fbase";
import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";


const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text)
  const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`)
  const onDeleteClick = async () => {
    const ok = window.confirm("really delete?");
    if (ok) {
      await deleteDoc(NweetTextRef);
    }
  }
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async(event) => {
    event.preventDefault();
    await updateDoc(NweetTextRef, {
      text: newNweet,
      });
      setEditing(false)
  }
  const onChange = (event) => {
    const { target: { value }, } = event;
    setNewNweet(value);
  };
  return (
    <div>
      {editing ? (
          <>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                value={newNweet}
                placeholder="what is editing"
                required
                onChange={onChange}
              />
              <input type="submit" value="Update Nweet" />
            </form>
            <button onClick={toggleEditing}>Cancel</button>
          </>
        ) : (
          <>
            <h4>{nweetObj.text}</h4>
            {isOwner && (
              <>
                <button onClick={onDeleteClick}>Delete Nweet</button>
                <button onClick={toggleEditing}>Edit Nweet</button>
              </>
            )}
          </>
          )}
    </div>
  );
}

export default Nweet