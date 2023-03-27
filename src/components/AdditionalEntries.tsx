import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

interface IProps {
  newKey: string;
  newValue: string | Record<string, unknown>;
  acceptRejectHandlers?: () => JSX.Element;
}

const AdditionalEntries: React.FC<IProps> = ({
  newKey,
  newValue,
  acceptRejectHandlers,
}) => {
  return (
    <OverlayTrigger
      rootClose
      trigger="click"
      placement={"top"}
      overlay={
        <Popover id={"positioned-top"} className="rounded-0">
          <Popover.Body className="p-1">
            {acceptRejectHandlers ? acceptRejectHandlers() : null}
          </Popover.Body>
        </Popover>
      }
    >
      <div className="text-bg-success bg-opacity-75 px-1" role="button">
        {`${newKey} : ${newValue}`}
      </div>
    </OverlayTrigger>
  );
};

export default AdditionalEntries;
