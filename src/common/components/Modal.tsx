import React from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Color, { Opacity } from 'common/constants/colors';
import FontFamily from 'common/constants/fonts';

interface ModalProps {
    visible: boolean,
    message: string,
    okButtonText: string,
    okButtonFn: () => void,
    cancelButtonFn: () => void,
}

function CustomModal(props: ModalProps) {
    const { visible, message, okButtonText, okButtonFn, cancelButtonFn } = props;

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={visible}
        >
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{message}</Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={cancelButtonFn}
                        >
                            <Text style={[styles.textStyle, styles.cancelTextStyle]}>Skip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.okButton]}
                            onPress={okButtonFn}
                        >
                            <Text style={styles.textStyle}>{okButtonText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.DARK_GREY + Opacity.OVERLAY,
    },
    modalView: {
        margin: 20,
        backgroundColor: Color.OFF_WHITE,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: Color.DARK_GREY,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    button: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Color.MID_GREY,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 12,
        paddingRight: 12,
        elevation: 2,
        marginRight: 5,
        marginLeft: 5,
    },
    okButton: {
        backgroundColor: Color.ORANGE,
        borderColor: Color.ORANGE,
    },
    cancelButton: {
        backgroundColor: Color.OFF_WHITE,
        borderColor: Color.MID_GREY,
    },
    textStyle: {
        color: Color.OFF_WHITE,
        fontFamily: FontFamily.CTA,
        textAlign: 'center',
    },
    cancelTextStyle: {
        color: Color.MID_GREY,
    },
    modalText: {
        fontFamily: FontFamily.BODY,
        color: Color.DARK_GREY,
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default CustomModal;
