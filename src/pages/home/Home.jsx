/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import uploadIcon from "../../assets/image-upload-icon/upload-icon.png";
import { useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const [dargItem, setDargItem] = useState(null);
  const [dargOverItem, setOverDargItem] = useState(null);
  const [deleteItems, setDeleteItems] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // this is default data for first time if data store empty then these data will be show
  const defaultData = [
    "https://i.ibb.co/6Wfdwzt/image-1.webp",
    "https://i.ibb.co/3T5jz6t/image-2.webp",
    "https://i.ibb.co/3kNdYYy/image-3.webp",
    "https://i.ibb.co/jVZhXdz/image-4.webp",
    "https://i.ibb.co/jwz6jMR/image-5.webp",
    "https://i.ibb.co/ZNt9jjt/image-6.webp",
    "https://i.ibb.co/sRC1kWq/image-7.webp",
    "https://i.ibb.co/QXFvcPd/image-8.webp",
    "https://i.ibb.co/8sMMbmL/image-9.webp",
    "https://i.ibb.co/Pc13QWT/image-10.jpg",
    "https://i.ibb.co/VLkcP4Z/image-11.jpg",
  ];

  useEffect(() => {
    const allData = JSON.parse(localStorage.getItem("images")) ?? [];
    if (!allData?.length) {
      localStorage.setItem("images", JSON.stringify(defaultData));
    }
    setData([...allData]);
  }, [refresh]);

  // reference for hidden input file
  const uploadRef = useRef(null);
  const handleImageClick = () => {
    uploadRef.current.click();
  };

  // handle data sorting with darg and drop
  const handelSorting = () => {
    let previousData = [...data];
    const selectedDargItem = previousData.splice(dargItem, 1)[0];
    previousData.splice(dargOverItem, 0, selectedDargItem);

    setData(previousData);

    setDargItem(null);
    setOverDargItem(null);
  };

  // handle selected multiple delete data
  const selectMultipleDelete = (deleteItem) => {
    if (deleteItems.includes(deleteItem)) {
      const filterDeleteData = deleteItems.filter((d) => d !== deleteItem);
      return setDeleteItems([...filterDeleteData]);
    }
    setDeleteItems([...deleteItems, deleteItem]);
  };

  // by one click unselect all selected delete data
  const unselectMultipleDelete = (event) => {
    if (!event.target.checked) {
      setDeleteItems([]);
    }
  };

  // delete all selected data by this function
  const deleteAllSelected = () => {
    // let afterDelete = [...data];
    let afterDelete = JSON.parse(localStorage.getItem("images")) ?? [];
    deleteItems.forEach((item) => {
      const filterFromDelete = afterDelete.filter((d) => d !== item);
      afterDelete = filterFromDelete;
    });

    // setData(afterDelete);
    localStorage.setItem("images", JSON.stringify(afterDelete));
    setDeleteItems([]);
    setRefresh(!refresh);
  };

  // add image function, here i have used imgbb website for host image and i have store data in local store as a database
  const addImage = (img) => {
    const formData = new FormData();
    formData.append("image", img);
    fetch(
      "https://api.imgbb.com/1/upload?key=73adcb71f1df263fc9562299dd50904b",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((imgData) => {
        const storeImages = JSON.parse(localStorage.getItem("images")) ?? [];
        storeImages.push(imgData.data.url);

        localStorage.setItem("images", JSON.stringify(storeImages));
        setRefresh(!refresh);
      });
  };

  return (
    <div className="home-page">
      <h2>
        {deleteItems.length > 0 ? (
          <span className="selected-text">
            <input
              type="checkbox"
              defaultChecked={deleteItems.length}
              onChange={(e) => unselectMultipleDelete(e)}
              className="overlay-input"
            />
            {deleteItems.length} Files Selected
          </span>
        ) : (
          "Gallery"
        )}

        {deleteItems.length > 0 && (
          <button
            onClick={() => deleteAllSelected()}
            type="button"
            className="delete"
          >
            Delete files
          </button>
        )}
      </h2>

      <div className="gallery-container">
        {data.map((d, index) => (
          <div
            key={index}
            className="image-item"
            draggable
            onDragStart={() => setDargItem(index)}
            onDragEnter={() => setOverDargItem(index)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnd={handelSorting}
          >
            <img src={d} alt="image" />
            <div
              className={` ${
                deleteItems.includes(d)
                  ? "overlay-show overlay-bg-2"
                  : "image-item-overlay overlay-bg-1"
              }`}
            >
              <input
                type="checkbox"
                checked={deleteItems.includes(d) ? true : false}
                onChange={(e) => (e.target.checked ? true : false)}
                onClick={() => selectMultipleDelete(d)}
                className="overlay-input"
              />
            </div>
          </div>
        ))}
        <div className="add-image-item" onClick={() => handleImageClick()}>
          <input
            ref={uploadRef}
            type="file"
            accept="image/jpg, image/jpeg, image/png,image/webp"
            onChange={(e) => addImage(e.target.files[0])}
          />
          <div className="icon-div">
            <img src={uploadIcon} alt="upload icon" />
            <p>Add Images</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
