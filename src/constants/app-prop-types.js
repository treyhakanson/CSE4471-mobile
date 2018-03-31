import PropTypes from "prop-types";
import moment from "moment";

export const SiteType = PropTypes.shape({
   key: PropTypes.string.isRequired,
   title: PropTypes.string.isRequired,
   actionDate: PropTypes.instanceOf(moment)
});
