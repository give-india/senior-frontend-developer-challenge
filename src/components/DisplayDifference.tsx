import { FC } from "react";
import { OverlayTrigger, Popover, Stack } from "react-bootstrap";

interface DisplayDiffProps {
  oldValue: string;
  newValue: string | Record<string, unknown>;
  acceptRejectHandlers?: () => JSX.Element;
}

const DisplayDifference: FC<DisplayDiffProps> = ({
  oldValue,
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
      <Stack direction="horizontal" gap={1} className="align-items-start" role={"button"}>
        <div>
          <span className="text-bg-danger bg-opacity-75 px-1 text-decoration-line-through">{oldValue}</span>
        </div>
        <div>
          {typeof newValue == "object" ? (
            <pre className="bg-primary bg-opacity-25 px-1 mb-0">
              <span className="">{JSON.stringify(newValue, null, 2)}</span>
            </pre>
          ) : (
            <span className="text-bg-primary bg-opacity-25 px-1">
              {newValue}
            </span>
          )}
        </div>
      </Stack>
    </OverlayTrigger>
  );
};

export default DisplayDifference;
