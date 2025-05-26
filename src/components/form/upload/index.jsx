import { useState } from "react";
import { Image, Upload as AntdUpload } from "antd";
import { BsUpload } from "react-icons/bs";
import { DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import styles from "./upload.module.css";

export const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const Upload = (props) => {
  const {
    filesList: filesData,
    onUploadedList,
    onAllFilesDone,
    errorMessage,
    maxFileSize = 5,
  } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState(filesData || []);
  const [error, setError] = useState(false);

  const onUploadHandle = async ({ fileList: newFileList }) => {
    const updatedFileList = newFileList.map((file) => {
      let state = "done";
      const isValidSize = file.size / (1024 * 1024) <= maxFileSize;
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/jpg",
        "image/avif",
      ];
      const isValidType = allowedTypes.includes(file.type);

      if (file?.size && !(isValidType && isValidSize)) {
        state = "error";
      }

      return { ...file, status: state };
    });
    setFileList(updatedFileList);
    let isAllFilesDone = updatedFileList.every(
      (item) => item.status === "done"
    );
    if (isAllFilesDone) {
      onAllFilesDone(true);
    }

    // Call the parent callback
    onUploadedList(updatedFileList);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const beforeUpload = (file) => {
    const isValidSize = file.size / (1024 * 1024) <= maxFileSize;
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/jpg",
      "image/avif",
    ];
    const isValidType = allowedTypes.includes(file.type);

    if (!isValidType) {
      errorMessage(`File is not a valid image format.`);
      setError(true);
    } else if (!isValidSize) {
      errorMessage(`Image size should be less than ${maxFileSize}MB`);
      setError(true);
    }

    if (isValidSize && isValidType) {
      setError(false);
    }
    return isValidType && isValidSize;
  };

  return (
    <DndUploadLayer
      fileList={fileList}
      setFileList={setFileList}
      onUploadHandle={onUploadHandle}
    >
      <div className={`${styles.upload} ${error && styles.error}`}>
        <AntdUpload
          customRequest={() => {}}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={onUploadHandle}
          beforeUpload={beforeUpload}
          itemRender={(originNode, file) => (
            <DraggableUploadListItem originNode={originNode} file={file} />
          )}
          multiple
        >
          {fileList.length <= 4 ? (
            <div className={`${styles.uploadContainer}`}>
              <BsUpload />
              <div className={`${styles.uploadText}`}>Upload</div>
            </div>
          ) : null}
        </AntdUpload>

        {previewImage && (
          <Image
            wrapperStyle={{
              display: "none",
            }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
      </div>
    </DndUploadLayer>
  );
};

const DndUploadLayer = ({
  children,
  fileList,
  setFileList,
  onUploadHandle,
}) => {
  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setFileList((prev) => {
        const activeIndex = prev.findIndex((i) => i.uid === active.id);
        const overIndex = prev.findIndex((i) => i.uid === over?.id);
        let list = arrayMove(prev, activeIndex, overIndex);
        onUploadHandle({ fileList: list });
        return list;
      });
    }
  };

  return (
    <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
      <SortableContext
        items={fileList.map((i) => i.uid)}
        strategy={horizontalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
};

const DraggableUploadListItem = ({ originNode, file }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: file.uid,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: "move",
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      // prevent preview event when drag end
      className={`${styles.dragItem} ${isDragging && styles.draggingItem}`}
      {...attributes}
      {...listeners}
    >
      {/* hide error tooltip when dragging */}
      {file.status === "error" && isDragging
        ? originNode.props.children
        : originNode}
    </div>
  );
};
