import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserTransactions = ({ transactions, loading, error, returnBook }) => {

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    };

    if (loading) return <div>Loading transactions...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section className='w-full max-w-7xl mx-auto'>
            <Card className='overflow-hidden'>
                <CardHeader>
                    <CardTitle>Your Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Book Title</TableHead>
                                    <TableHead>Issue Date</TableHead>
                                    <TableHead>Rent</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map((transaction) => (
                                    <TableRow key={transaction._id}>
                                        <TableCell>
                                            <Link to={`/books/${transaction.bookId._id}`}>
                                                {transaction.bookId.title}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{formatDate(transaction.issueDate)}</TableCell>
                                        <TableCell>{transaction.bookId.rentPerDay}rs</TableCell>
                                        <TableCell>{transaction.status}</TableCell>
                                        <TableCell>{
                                            transaction.status === "ISSUED" ?
                                                <span
                                                    onClick={() => returnBook(transaction.bookId._id)}
                                                    className='underline'>return</span>
                                                : formatDate(transaction.returnDate)
                                        }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
                <CardFooter>
                    Total Rent : {transactions.reduce((acc, transaction) => acc + (transaction.rentAmount ? transaction.rentAmount : transaction.bookId.rentPerDay), 0)} Rs /-
                </CardFooter>
            </Card>
        </section>
    );
};

export default UserTransactions;