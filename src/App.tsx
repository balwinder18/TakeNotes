import { useEffect, useState } from "react";
export default function App() {

  const [text, setText] = useState<string>("");
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const savedToken = localStorage.getItem("noteToken"); 
    if (savedToken) {
      setToken(savedToken);
      const savedText = localStorage.getItem(savedToken);
      if (savedText) {
        setText(savedText);
      }
    }
  }, []);
  const note = "note";
  
  useEffect(() => {

    if (token) {
      localStorage.setItem(token, text); 
    }
    else {
      localStorage.setItem("noteToken", note);
      const savedText = localStorage.getItem(note);
      if (savedText) {
        setText(savedText); 
      } else {
        setText(""); 
        
      }

    }

    
  }, [text, token, note]);

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

  const DeleteToken = () => {


    const newtext = "";
    setText(newtext); 



  }

 
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


   

    <div className="h-[600px] w-[400px] bg-gray-900 shadow-xl rounded-lg border border-gray-700 overflow-hidden flex flex-col">
 
  <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-bold text-white">Take Notes</h2>
        <p className="text-xs text-gray-400">Easiest way of writing</p>
      </div>
      <button
        onClick={DeleteToken}
        className="text-xs bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md transition-colors duration-150"
      >
        Clear All
      </button>
    </div>
  </div>

 
  <div className="flex-1 flex flex-col p-4 overflow-hidden">
   
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-md font-semibold text-gray-300">Upload and Edit</h3>
      </div>
      <div className="flex items-center space-x-2">
        <label className="flex-1">
          <div className="flex items-center justify-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md cursor-pointer transition-colors duration-150">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span>Choose .txt File</span>
            <input
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </label>
      </div>
    </div>

   
    <div className="border-t border-gray-700 my-3"></div>

   
    <div className="flex-1 flex flex-col">
      <div className="flex-1 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        <textarea
          className="w-full h-full p-4 bg-gray-800 text-gray-300 resize-none focus:outline-none"
          placeholder="Type your notes here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      
     
      <div className="flex justify-end mt-3 space-x-2">
        <button
          onClick={handleDownload}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-150"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download as .txt
        </button>
      </div>
    </div>
  </div>

 
  <div className="bg-gray-800 px-4 py-2 text-xs text-gray-500 text-center border-t border-gray-700">
    Notes are saved automatically
  </div>
</div>

  )
}