import React from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'blockquote',
  'list',
  'bullet',
  'ordered',
  'link',
];

const RichTextEditor: React.FC = React.forwardRef<
  ReactQuill,
  React.PropsWithRef<ReactQuillProps>
>((props, ref) => {
  // const [value, setValue] = useState('');

  return (
    <>
      <ReactQuill
        ref={ref}
        modules={modules}
        formats={formats}
        // value={value}
        // onChange={setValue}
        {...props}
        theme="snow"
      />
    </>
  );
});

export default RichTextEditor;
