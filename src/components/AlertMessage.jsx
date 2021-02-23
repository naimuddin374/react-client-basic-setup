import React from 'react'
import { connect } from 'react-redux';
import Swal from 'sweetalert2'

class AlertMessage extends React.Component {

    state = {
        message: null,
        type: null,
        id: null
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.flash.id !== prevState.id) {
            return {
                message: nextProps.flash.message,
                type: nextProps.flash.type,
                id: nextProps.flash.id,
            }
        }
        return null
    }

    render() {
        let { message, type } = this.state
        if (message) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: type,
                title: message
            })
        }
        return <></>
    }
}

const mapStateToProps = state => ({
    flash: state.flash
})
export default connect(mapStateToProps)(AlertMessage)