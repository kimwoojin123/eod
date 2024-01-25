import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const modules = {
    toolbar: {
      container: [
        ["image", "link"],
        [{ header: [1, 2, 3, 4, 5, false] }],
        ["bold", "italic", "underline", "strike"],
      ],
    },
  };


  return (
    <ReactQuill
      style={{ width: "800px", height: "600px" }}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
    />
  );
};

export default TextEditor;
