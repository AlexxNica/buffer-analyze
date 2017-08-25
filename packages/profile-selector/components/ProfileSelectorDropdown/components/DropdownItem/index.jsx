import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  CircleFacebookIcon,
  CircleInstagramIcon,
  CircleLinkedInIcon,
  CircleTwitterIcon,
  Image,
  Text,
} from '@bufferapp/components';

import {
  dropdownListItem,
} from '../../style.less';

const socialIconSize = 11;
const avatarSize = 24;

export const SocialIcon = ({ service }) => {
  let icon;
  switch (service) {
    case 'twitter':
      icon = <CircleTwitterIcon color={service} size={{ width: '100%', height: '100%' }} />;
      break;
    case 'facebook':
      icon = <CircleFacebookIcon color={service} size={{ width: '100%', height: '100%' }} />;
      break;
    case 'instagram':
      // TODO using this as it's the only red we have
      // but we need to change it to match instagram color
      icon = <CircleInstagramIcon color={'torchRed'} size={{ width: '100%', height: '100%' }} />;
      break;
    case 'linkedin':
      icon = <CircleLinkedInIcon color={service} size={{ width: '100%', height: '100%' }} />;
      break;
    default:
      icon = null;
      break;
  }

  return (
    <div style={{
      background: '#fff',
      position: 'absolute',
      width: `${socialIconSize}px`,
      height: `${socialIconSize}px`,
      top: `${avatarSize - socialIconSize}px`,
      left: `${avatarSize - socialIconSize}px`,
      borderRadius: '50%',
    }}
    >
      {icon}
    </div>
  );
};

SocialIcon.propTypes = {
  service: PropTypes.oneOf(['twitter', 'facebook', 'instagram', 'linkedin']).isRequired,
};

export const ProfileBadge = ({ avatarUrl, service }) => {
  const avatarPixelSize = `${avatarSize}px`;
  return (
    <div style={{ position: 'relative', marginRight: '10px' }} >
      <Image
        border={'circle'}
        src={avatarUrl}
        height={avatarPixelSize}
        width={avatarPixelSize}
      />
      <SocialIcon service={service} />
    </div>
  );
};

ProfileBadge.propTypes = {
  service: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
};

const DropdownItem = ({ profile, handleClick }) => (
  <li className={dropdownListItem}>
    <Button noStyle onClick={handleClick} >
      <span
        style={{
          alignItems: 'center',
          display: 'flex',
          position: 'relative',
          width: '100%',
        }}
      >
        <ProfileBadge avatarUrl={profile.avatarUrl} service={profile.service} />
        <Text weight="bold" size="small">{profile.username}</Text>
      </span>
    </Button>
  </li>
);

DropdownItem.propTypes = {
  profile: PropTypes.shape({
    service: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default DropdownItem;
