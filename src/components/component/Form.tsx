import { Button } from "../ui/button";

interface FormPageProps {
  newName: string;
  setNewName: (value: string) => void;
  newEmail: string;
  setNewEmail: (value: string) => void;
  addUser: (name: string, email: string) => void;
  editUserId?: string | null;
  updateUser: (id: string, name: string, email: string) => void;
}
export default function FormPage({
  newName,
  setNewName,
  newEmail,
  setNewEmail,
  addUser,
  editUserId,
  updateUser,
}: FormPageProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editUserId) {
      updateUser(editUserId, newName, newEmail);
    } else {
      addUser(newName, newEmail);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="border border-gray-400 space-x-2 py-2 p-2"
      >
        <input
          type="text"
          placeholder="New Name"
          value={newName}
          className="border border-gray-400"
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Email"
          value={newEmail}
          className="border border-gray-400"
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
