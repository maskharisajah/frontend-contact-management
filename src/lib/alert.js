import swal from 'sweetalert2';

export const alertSuccess = async (message) => {
    return swal.fire({
        icon: 'success',
        title: 'Success',
        text: message
    })
}

export const alertError = async (message) => {
    return swal.fire({
        icon: 'error',
        title: 'Ups',
        text: message
    })
}

export const alertConfirm = async (message) => {
    const result = await swal.fire({
        icon: "question",
        title: "Are you sure?",
        text: message,
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes"
    });
    return result.isConfirmed;
}

export const alertLoginFirst = async (message) => {
    const result = await swal.fire({
        icon: "warning",
        title: "Dont have access",
        text: message,
        confirmButtonColor: "#d33",
        confirmButtonText: "Yes"
    });
    return result.isConfirmed;
}