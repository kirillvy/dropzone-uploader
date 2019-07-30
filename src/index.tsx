/**
 * declares and imports of namespaces, interfaces & types
 */
 export interface IUploader {
   children?: any;
   width?: number;
   height?: number;
 }

 /**
  * imports of packages
  */
import React from 'react';

/**
 * imports of styles
 */
import { UploaderInput, UploaderSection } from './index.styles'



const Uploader: React.FC<IUploader> = ({width, height, children, ...props}) => {
  const updateProgress = function(this: XMLHttpRequestUpload, ev: ProgressEvent) {
    this
  };
  const transferComplete = function(this: XMLHttpRequestUpload, ev: ProgressEvent) {
    this
  };
  const transferFailed = function(this: XMLHttpRequestUpload, ev: ProgressEvent) {
    this
  };
  const transferCanceled  = function(this: XMLHttpRequestUpload, ev: ProgressEvent) {
    this
  };

  const doUpload = (file: File) => {

    const data = new FormData();
    data.append('inputname', file);
  
    const req = new XMLHttpRequest();
    req.open('POST', '');
    req.send(data);

    req.upload.addEventListener("progress", updateProgress);
    req.upload.addEventListener("load", transferComplete);
    req.upload.addEventListener("error", transferFailed);
    req.upload.addEventListener("abort", transferCanceled);
  }
  
  const onDrop = (ev: React.DragEvent<HTMLDivElement>) => {  // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    const {items} = ev.dataTransfer;
    if (items && items.length > 0 && ev.dataTransfer.items[0].kind === 'file') {
      // Use DataTransferItemList interface to access the file(s)
        if (ev.dataTransfer.items[0].kind === 'file') {
          const file = ev.dataTransfer.items[0].getAsFile();
          if (file !== null) {
            doUpload(file);
          }
        }
    } else {
      const { files } = ev.dataTransfer;
      if (files === null || files.length < 1) {
        return;
      }
      doUpload(files[0]);
    }
  }
  
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files === null || files.length < 1) {
      return;
    }
    doUpload(files[0]);
  }

  const el = <>
  <div style={UploaderSection}>
    <span>Drag a photo here or click to choose file</span>
    {children}
  </div>
  <input style={UploaderInput} onDrop={onDrop} type={'file'} onChange={onChange} />
  </>

  if (width || height) {
    return <div style={{width: width || '100%', height: height || '100%'}}>
      {el}
    </div>
  }
  return el;
};

export default Uploader;
