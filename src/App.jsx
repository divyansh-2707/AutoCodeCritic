import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Editor from "@monaco-editor/react";
import Select from "react-select";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";
import { PacmanLoader } from "react-spinners";

const App = () => {
  const options = [
    { value: "python", label: "Python" },
    { value: "javascript", label: "JavaScript" },
    { value: "java", label: "Java" },
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "typescript", label: "TypeScript" },
    { value: "ruby", label: "Ruby" },
    { value: "php", label: "PHP" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "r", label: "R" },
    { value: "dart", label: "Dart" },
    { value: "sql", label: "SQL" },
  ];

  const [selectedOptions, setselectedOptions] = useState(options[0]);

  const customDarkStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#1f2937", // dark gray (Tailwind: gray-800)
      borderColor: "#4b5563", // gray-600
      color: "#fff",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#1f2937",
      color: "#fff",
      width: "30%",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#374151" : "#1f2937", // gray-700 on hover
      color: "#fff",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#fff",
    }),
    input: (base) => ({
      ...base,
      color: "#fff",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9ca3af", // gray-400
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#374151", // gray-700
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#fff",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#9ca3af",
      ":hover": {
        backgroundColor: "#4b5563", // gray-600
        color: "white",
      },
    }),
  };

  const [code, setCode] = useState("");
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyAuB84zyND_N3KGHypmfvoj1q6xAY25GSw",
  });
  const [loading, setloading] = useState(false);
  const [response, setResponse] = useState("");
  async function reviewCode() {
    setResponse("")
    setloading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are an AI-powered code reviewer. Your task is to analyze and evaluate the following source code and provide detailed, structured feedback. Here are the expectations:

- Use your language modeling capabilities to understand the context of the code.
- The code is written in: ${selectedOptions.value}
- Review the code for the following:
  - ✅ Code quality and structure
  - 🐞 Potential bugs and logical errors
  - ⚡ Performance improvements
  - 🔐 Security vulnerabilities
  - 📚 Adherence to language-specific best practices
  - ✅ Fix it , if it is wrong
- Provide suggestions that are:
  - Contextual to the code's logic
  - Easy to understand for developers at all levels
  - Actionable and organized
  - Aimed at improving readability, maintainability, and efficiency

Code:
${code}`,
    });
    console.log(response.text);
    setResponse(response.text);
    setloading(false);
  }

  return (
    <div>
      <Navbar />
      <div
        className="main flex justify-between"
        style={{ height: "calc(100vh - 90px" }}
      >
        <div className="left h-[85%] w-[50%]">
          <div className="tab !mt-5 !px-5 !mb-3 w-full flex items-center gap-4">
            <div className="flex-1 basis-[70%]">
              <Select
                value={selectedOptions}
                onChange={(e) => setselectedOptions(e)}
                options={options}
                styles={customDarkStyles}
              />
            </div>
            <button
              onClick={() => {
                if (code === "") {
                  alert(`Enter the code please!!`);
                } else {
                  reviewCode();
                }
              }}
              className="btnNormal basis-[20%] bg-zinc-600 transition-all hover:bg-zinc-800"
            >
              AI Code Fixer
            </button>
            {/* <button className="btnNormal basis-[20%] bg-zinc-600 transition-all hover:bg-zinc-800">
              Fix Code
            </button> */}
          </div>
          <Editor
            height="100%"
            language={selectedOptions.value}
            value={code}
            onChange={(e) => {
              setCode(e);
            }}
            theme="vs-dark"
          />
        </div>

        <div className="right overflow-scroll !p-[10px] bg-zinc-800 w-[50%] h-[100%]">
          <div className="topTab border-b-[1px] border-t-[1px]  border-[#3e3e42] flex items-center justify-between h-[60px]">
            <p className="font-[700] text-[17px]">Response</p>
          </div>
          {loading && <PacmanLoader color="#86198f" />}
          <Markdown>{response}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default App;
