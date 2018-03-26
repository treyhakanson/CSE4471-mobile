import PropTypes from "prop-types";
import moment from "moment";

export const SiteType = PropTypes.shape({
   title: PropTypes.string.isRequired,
   actionDate: PropTypes.instanceOf(moment)
});
