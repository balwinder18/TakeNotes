import { useState } from "react";
export default function App() {

  const [text, setText] = useState<string>("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target?.result as string;
        setText(fileContent);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid .txt file.");
    }
  };

  const handleDownload = () => {
    const fileName = prompt("Enter the name for the file (with .txt extension):", "edited-file.txt");
    if (!fileName || !fileName.trim()) {
      alert("File name cannot be empty.");
      return;
    }

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName.trim(); 

    
    link.click();
    URL.revokeObjectURL(url);
  };


  return (
   

    <div className="h-[600px] w-96 bg-black shadow-lg rounded-lg border border-gray-200 p-4">
      <div className="flex items-center space-x-4">

        <div>
          <h2 className="text-lg font-bold text-white">Take Notes</h2>
          <p className="text-sm text-gray-500">Easiest way of writing</p>
        </div>
      </div>
      <div className="mt-4">
        <hr className="w-full text-center" />
        <div id="options" className="h-auto">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Upload and Edit
          </h2>
          <input
            type="file"
            accept=".txt"
            onChange={handleFileUpload}
            className="mb-4 w-full text-gray-700"
          />
        </div>
        <hr className="w-full text-center" />
        <div id="Notepad" className="mt-3">
          <div className="max-w-sm mx-auto bg-black  p-2">
            <div className="max-w-md mx-auto bg-black  p-2">
           <textarea
                className="w-full h-[330px] p-3 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
              <button
                onClick={handleDownload}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              >
                Download as .txt
              </button>
            </div>



          </div>



        </div>

      </div>
    </div>

  )
}