import { Alert, Snackbar } from "@mui/material";
import PropTypes from "prop-types";

const Notification = ({ notification, onClose }) => {
  return (
    <Snackbar
      open={!!notification}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      {notification ? (
        <Alert
          onClose={onClose}
          severity={notification.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      ) : null}
    </Snackbar>
  );
};

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["success", "error", "info", "warning"]).isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default Notification;