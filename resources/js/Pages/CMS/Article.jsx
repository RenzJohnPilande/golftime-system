import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import Pagination from '@/components/Pagination';
import PrimaryButton from '@/components/PrimaryButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
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
            destroy(route('articles.delete', { id: selected }), {
                onSuccess: () => {
                    setSelected(null);
                    onClose();
                },
                onError: (errors) =>
                    console.error('Error deleting article:', errors),
            });
        }
    };

    const { url } = usePage();
    const handlePageChange = (page) => {
        router.get(url.split('?')[0], { page }, { preserveScroll: true });
    };

    // Search
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.get(
                route('articles.index'),
                { search: searchTerm },
                {
                    preserveScroll: true,
                    preserveState: true,
                },
            );
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Articles Management" />
            <div className="flex min-h-screen w-full flex-col flex-wrap gap-2 bg-zinc-50 p-5">
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
                                    'flex flex-wrap w-full justify-center text-center transition-all duration-50 bg-gray-700 hover:bg-gray-600 text-white shadow-lg',
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

                <div className="flex w-full flex-wrap">
                    <div className="flex w-full flex-wrap items-end justify-between gap-2 md:flex-nowrap">
                        <h1 className="w-full text-lg font-bold capitalize">
                            Product List
                        </h1>
                        <form
                            onSubmit={handleSearchSubmit}
                            className="flex w-full items-center justify-end gap-2 pb-2"
                        >
                            <Input
                                type="search"
                                placeholder="Search"
                                className="w-full md:max-w-[200px]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoFocus
                            />
                            <Button
                                variant="outline"
                                type="submit"
                                className="bg-gray-700 text-white hover:bg-gray-600 hover:text-white"
                            >
                                <Search />
                            </Button>
                        </form>
                    </div>
                    <div className="grid w-full grid-cols-1 flex-wrap gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {articles.data.map((article) => (
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
                    <Pagination
                        currentPage={articles.current_page}
                        totalPages={articles.last_page}
                        onPageChange={handlePageChange}
                    />
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
