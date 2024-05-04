import {
  Table,
  Label,
  Modal,
  TextInput,
  Textarea,
  Spinner,
  Button,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function AdminAnnouncement() {
  const { currentUser } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [announcementData, setAnnouncementData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setUpdateShowModal] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [announcementIdToDelete, setAnnouncementsIdToDelete] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await fetch(`/api/announcement/getAnnouncement`);
        const data = await res.json();
        if (res.ok) {
          setAnnouncements(data.announcements);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchAnnouncement();
  }, [currentUser._id]);

  const fetchUpdatedAnnouncementData = async (announcementId) => {
    try {
      const res = await fetch(
        `/api/announcement/getAnnouncement?announcementId=${announcementId}`
      );
      const data = await res.json();
      if (res.ok) {
        setAnnouncementData(data.announcements[0]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect(() => {
  //   // Fetch announcement data when the component mounts
  //   fetchUpdatedAnnouncementData(announcementIdToUpdate);
  // }, []);

  // const handleUpdateButtonClick = (announcementId) => {
  //   setAnnouncementsIdToUpdate(announcementId);

  //   fetchUpdatedAnnouncementData(announcementIdToUpdate);

  //   setUpdateShowModal(true);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.message) {
      return setError("All fields are required");
    }
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/announcement/createannouncement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        enqueueSnackbar(
          data.message,
          { variant: "error" },
          {
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          }
        );
        return setError(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/admin-dashboard?tab=admin-announcement");
        enqueueSnackbar(
          "Announcement created successfully",
          { variant: "success" },
          {
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
          }
        );
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
      enqueueSnackbar("Error", { variant: "error" });
    }
  };

  const handleAnnouncementDelete = async () => {
    try {
      const res = await fetch(
        `/api/announcement/deleteAnnouncement/${announcementIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setAnnouncements((prev) =>
          prev.filter(
            (announcement) => announcement._id !== announcementIdToDelete
          )
        );
        setShowModal(false);
        enqueueSnackbar("Announcement deleted successfully", {
          variant: "success",
        });
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/announcement/updateAnnouncement/${announcementData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return;
      }

      if (res.ok) {
        setError(null);
        enqueueSnackbar("Announcement updated successfully", {
          variant: "success",
        });
        // navigate("/admin-dashboard?tab=admin-announcement");
        // window.location.reload();
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="w-full p-3 overflow-x-scroll table-auto md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <h1 className="text-center m-5 font-bold text-2xl uppercase">
        Announcement
      </h1>
      {currentUser.isAdmin && (
        <div className="">
          <button
            onClick={() => setOpenModal(true)}
            className="text-white text-sm my-2 bg-cyan-600 border border-white rounded-md p-3 text-center flex items-center justify-center cursor-pointer hover:bg-cyan-900"
          >
            Add Announcement
          </button>
        </div>
      )}
      {announcements.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                Date created
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                Title
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                Message
              </Table.HeadCell>
              {currentUser.isAdmin && (
                <>
                  <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                    Update
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                    Delete
                  </Table.HeadCell>
                </>
              )}
            </Table.Head>
            {announcements.map((announcement) => (
              <Table.Body className="divide-y" key={announcement._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-[#1f1f1f]">
                  <Table.Cell>
                    {new Date(announcement.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{announcement.title}</Table.Cell>
                  <Table.Cell>{announcement.message}</Table.Cell>
                  {currentUser.isAdmin && (
                    <>
                      <Table.Cell>
                        <span
                          onClick={() => {
                            setUpdateShowModal(true);
                            fetchUpdatedAnnouncementData(announcement._id);
                          }}
                          className="font-medium text-green-500 cursor-pointer hover:underline"
                        >
                          Update
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span
                          onClick={() => {
                            setShowModal(true);
                            setAnnouncementsIdToDelete(announcement._id);
                          }}
                          className="font-medium text-red-500 cursor-pointer hover:underline"
                        >
                          Delete
                        </span>
                      </Table.Cell>
                    </>
                  )}
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>You have no anouncements yet!</p>
      )}
      <Modal
        show={openModal}
        size="lg"
        popup
        onClose={() => {
          setOpenModal(false);
          window.location.reload();
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Share an Announcement
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="title" value="Title" />
                </div>
                <TextInput
                  id="title"
                  type="text"
                  placeholder="title"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="message" value="Message" />
                </div>
                <Textarea
                  id="message"
                  placeholder="message..."
                  type="text"
                  className="h-32"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="w-full">
                <button className="text-white text-sm my-2 bg-[#4c0000] border border-white rounded-md p-3 text-center flex items-center justify-center cursor-pointer hover:bg-[#7e1010]">
                  {loading ? (
                    <>
                      <Spinner size="sm" />
                      <span className="pl-3">Loading...</span>
                    </>
                  ) : (
                    "Submit Announcement"
                  )}
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal
        show={showUpdateModal}
        size="lg"
        popup
        onClose={() => {
          setUpdateShowModal(false);
          window.location.reload();
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleUpdateAnnouncement}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Update an Announcement
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="title" value="Title" />
                </div>
                <TextInput
                  id="title"
                  type="text"
                  placeholder="title"
                  defaultValue={announcementData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="message" value="Message" />
                </div>
                <Textarea
                  id="message"
                  placeholder="message..."
                  type="text"
                  className="h-32"
                  defaultValue={announcementData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="w-full">
                <button className="text-white text-sm my-2 bg-cyan-600 border border-white rounded-md p-3 text-center flex items-center justify-center cursor-pointer hover:bg-cyan-900">
                  {loading ? (
                    <>
                      <Spinner size="sm" />
                      <span className="pl-3">Loading...</span>
                    </>
                  ) : (
                    "Update Announcement"
                  )}
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this announcement?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleAnnouncementDelete}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
