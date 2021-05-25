import React from 'react';
import Toast from 'react-native-root-toast';
import Color from 'common/constants/colors';

interface StyledToastProps {
    message: string,
    visible: boolean,
}

function StyledToast(props: StyledToastProps) {
    const { message, visible } = props;
    return (
        <Toast
            visible={visible}
            position={-125}
            backgroundColor={Color.DARK_GREY}
            textColor={Color.OFF_WHITE}
            opacity={0.9}
            keyboardAvoiding={true}
            hideOnPress={false}
        >
            {message}
        </Toast>
    );
}

export default StyledToast;