export default function prepareProductFormData(data) {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('description', data.description);

    if (data.thumbnail) {
        formData.append('thumbnail', data.thumbnail);
    }

    if (Array.isArray(data.images)) {
        data.images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });
    }

    formData.append('materials', data.materials.join(','));
    formData.append('sizes', data.sizes.join(','));
    formData.append('colors', data.colors.join(','));

    return formData;
}
