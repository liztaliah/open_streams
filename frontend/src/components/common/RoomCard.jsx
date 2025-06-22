import { useNavigate } from "react-router-dom";

export default function RoomCard({ room }) {
  const navigate = useNavigate();

  return (
    <div
      className="
      w-48 
      h-48 
      bg-neutral-500 
      rounded 
      shadow-md 
      p-4 
      m-2 
      flex 
      flex-col 
      justify-center 
      items-center 
      cursor-pointer 
      hover:shadow-lg 
      transition"
      onClick={() => navigate(`/room/${room.id}`)}
    >
      <h2 className="text-xl font-bold mb-2">{room.name}</h2>
      <p className="text-gray-600">ID: {room.id}</p>
      {/* Add more room data here if needed */}
    </div>
  );
}
