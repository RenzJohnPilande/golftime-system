import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import PrimaryButton from '@/components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import ArticleCard from './component/ArticleCard';
import ArticleCoverDialog from './dialogs/ArticleCoverDialog';
import ArticleDialog from './dialogs/ArticleDialog';
import ViewArticleDialog from './dialogs/ViewArticleDialog';

const Article = ({ articles }) => {
    const [articleDialogOpen, setArticleDialogOpen] = useState(false);
    const [articleViewDialogOpen, setArticleViewDialogOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [selected, setSelected] = useState(null);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] =
        useState(false);
    const [articleCoverDialogOpen, setArticleCoverDialogOpen] = useState(false);

    const [dialogConfig, setDialogConfig] = useState({
        title: '',
        formAction: '',
    });

    const user = usePage().props.auth.user;

    const useIsMobile = () => {
        const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

        useEffect(() => {
            const handleResize = () => setIsMobile(window.innerWidth < 640);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);
        return isMobile;
    };

    const isMobile = useIsMobile();

    const {
        data,
        setData,
        post,
        errors,
        processing,
        reset,
        patch,
        delete: destroy,
    } = useForm({
        title: '',
        location: '',
        date: '',
        image: '',
        content: '',
    });

    const {
        data: articleCoverData,
        setData: setArticleCoverData,
        patch: patchArticleCover,
        errors: articleCoverError,
        processing: articleCoverProcessing,
        reset: resetArticleCoverForm,
    } = useForm({
        image: '',
    });

    const onClose = () => {
        setArticleDialogOpen(false);
        setArticleCoverDialogOpen(false);
        setConfirmationDialogOpen(false);
        reset();
        setSelected(null);
    };

    const onViewClose = () => {
        setArticleViewDialogOpen(false);
        setSelected(null);
    };

    const handleEdit = (article) => {
        setSelected(article.id);
        setData({
            title: article.title,
            location: article.location,
            date: article.date,
            image: article.image,
            content: article.content,
        });
        setDialogConfig({
            title: 'Edit Article',
            formAction: 'update article',
        });
        setArticleDialogOpen(true);
    };

    const handleView = (article) => {
        setSelected(article.id);
        setArticleViewDialogOpen(true);
    };

    const handleDelete = (article) => {
        setSelected(article.id);
        setDialogConfig({
            title: 'Delete Article',
            message: `Are you sure you want to delete the article about ${article.title}? This action cannot be undone.`,
            formAction: 'delete article',
        });
        setConfirmationDialogOpen(true);
    };

    const handleUploadThumbnail = (article) => {
        setSelectedArticle(article);
        setSelected(article.id);
        setArticleCoverData({ image: article.image || '' });
        setArticleCoverDialogOpen(true);
    };

    const handleConfirm = () => {
        const { formAction } = dialogConfig;
        if (formAction === 'create article') {
            post(route('articles.store'), {
                onSuccess: onClose,
                onError: (errors) =>
                    console.log('Submission failed with errors:', errors),
            });
        } else if (formAction === 'update article') {
            patch(route('articles.update', { id: selected }), {
                onSuccess: onClose,
                onError: (errors) =>
                    console.log('Submission failed with errors:', errors),
            });
        } else if (formAction === 'update cover') {
            patchArticleCover(route('articles.updateCover', { id: selected }), {
                onSuccess: onClose,
                onError: (errors) => {
                    console.error('Cover Image update failed:', errors);
                },
            });
        } else if (formAction === 'delete article') {
            destroy(route('articles.delete', { id }), {
                onSuccess: () => {
                    setSelected(null);
                    onClose();
                },
                onError: (errors) =>
                    console.error('Error deleting article:', errors),
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Articles Management" />
            <div className="flex min-h-screen w-full flex-col flex-wrap bg-zinc-50 p-5">
                <div className="flex h-fit w-full flex-wrap items-end justify-between gap-2">
                    <div className="w-full md:w-auto">
                        <h1 className="text-3xl font-bold md:text-2xl">
                            Articles Management
                        </h1>
                        <h2 className="text-base md:text-sm">
                            Manage your news articles and stay organized with
                            all the details in one place.
                        </h2>
                    </div>
                    <div className="w-full md:w-auto">
                        <PrimaryButton
                            text={'new article'}
                            style={{
                                wrapper:
                                    'flex flex-wrap w-full justify-center text-center transition-all duration-50 bg-zinc-700 hover:bg-zinc-600 text-white shadow-lg',
                                text: 'capitalize text-sm md:text-xs',
                            }}
                            onClick={() => {
                                setDialogConfig({
                                    title: 'Create New article',
                                    formAction: 'create article',
                                });
                                setArticleDialogOpen(true);
                            }}
                        />
                    </div>
                </div>
                <div className="flex w-full flex-wrap gap-4 py-5">
                    {articles.map((article) => (
                        <ArticleCard
                            key={article.id}
                            article={article}
                            onView={handleView}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onUploadThumbnail={handleUploadThumbnail}
                        />
                    ))}
                </div>
                <ArticleDialog
                    open={articleDialogOpen}
                    close={onClose}
                    selected={selected}
                    user={user}
                    formData={{ data, setData, errors, processing, reset }}
                    setDialogConfig={setDialogConfig}
                    setSelected={setSelected}
                    setConfirmationDialogOpen={setConfirmationDialogOpen}
                />
                <ViewArticleDialog
                    open={articleViewDialogOpen}
                    close={onViewClose}
                    selected={selected}
                />
                <ArticleCoverDialog
                    open={articleCoverDialogOpen}
                    close={() => setArticleCoverDialogOpen(false)}
                    selected={selectedArticle}
                    formData={{
                        data: articleCoverData,
                        setData: setArticleCoverData,
                        errors: articleCoverError,
                        processing: articleCoverProcessing,
                        reset: resetArticleCoverForm,
                    }}
                    setDialogConfig={setDialogConfig}
                    setConfirmationDialogOpen={setConfirmationDialogOpen}
                />
                <ConfirmationDialog
                    open={isConfirmationDialogOpen}
                    onClose={() => setConfirmationDialogOpen(false)}
                    onConfirm={handleConfirm}
                    config={dialogConfig}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Article;
